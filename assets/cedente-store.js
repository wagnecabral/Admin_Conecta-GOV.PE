/* Protótipo: armazenamento apenas neste navegador. Sem SSO ou backend real. */
(function(){
 const KEY='conecta.cedente.v1';
 const orgaos=[{id:'1',sigla:'ATI',nome:'Agência Estadual de Tecnologia da Informação'},{id:'2',sigla:'SEFAZ',nome:'Secretaria da Fazenda'},{id:'3',sigla:'SEPLAG',nome:'Secretaria de Planejamento e Gestão'},{id:'4',sigla:'SES',nome:'Secretaria de Saúde'},{id:'5',sigla:'SEE',nome:'Secretaria de Educação'},{id:'6',sigla:'SEDS',nome:'Secretaria de Desenvolvimento Social'}];
 const categorias=['Serviços','Fiscal','Segurança','Social','Saúde','Educação','Meio Ambiente'];
 const DISP_KEY='conecta.disponibilizacao.v1';
 function readDisponibilizacoes(){try{const raw=localStorage.getItem(DISP_KEY);const arr=raw?JSON.parse(raw):[];return Array.isArray(arr)?arr:[];}catch(e){return [];}}
 function saveDisponibilizacoes(arr){localStorage.setItem(DISP_KEY,JSON.stringify(arr));window.dispatchEvent(new Event('disponibilizacao-change'));}
 function submitDisponibilizacao(form,cpf){
   const arr=readDisponibilizacoes(),now=new Date().toISOString();
   const seq=String(arr.length+1).padStart(4,'0');
   const r={id:'CED-'+new Date().getFullYear()+'-'+seq,cpf:cpf||'04631809418',api:form.api||'API ainda não definida',orgao:form.orgao||'',unidade:form.unidade||'',solicitante:form.nome||'',cargo:form.cargo||'',email:form.email||'',telefone:form.telefone||'',contato:form.contatoTecnico||'',emailTec:form.emailTecnico||'',finalidade:form.finalidade||'',complemento:form.complemento||'',data:now,status:'Em análise',parecer:'Solicitação recebida e encaminhada para análise do time do GAS.',historico:[{data:now,status:'Em análise',texto:'Solicitação enviada para análise.'}]};
   arr.unshift(r);saveDisponibilizacoes(arr);return r;
 }
 function decideDisponibilizacao(id,status,parecer){
   const arr=readDisponibilizacoes(),r=arr.find(x=>x.id===id);if(!r)throw Error('Solicitação não encontrada.');
   if((status==='Rejeitada'||status==='Ajuste solicitado')&&!String(parecer||'').trim())throw Error('Informe o parecer / justificativa.');
   const now=new Date().toISOString();r.status=status;r.parecer=String(parecer||'').trim()||(status==='Aprovada'?'Solicitação aprovada pelo time do GAS.':'');
   r.historico=[...(r.historico||[]),{data:now,status,texto:r.parecer}];saveDisponibilizacoes(arr);return r;
 }

 function read(){const raw=localStorage.getItem(KEY);if(!raw)return {registros:[],notificacoes:[]};const db=JSON.parse(raw);if(!Array.isArray(db.registros)||!Array.isArray(db.notificacoes))throw Error('Não foi possível ler os dados locais do protótipo.');return db;}
 function save(db){localStorage.setItem(KEY,JSON.stringify(db));window.dispatchEvent(new Event('cedente-change'));}
 function submit(form,user,anterior){const db=read(),prior=anterior?db.registros.find(r=>r.id===anterior):null;if(anterior&&(!prior||prior.orgaoId!==user.orgaoId||prior.situacao==='Aguardando análise'))throw Error('A submissão não está disponível para alteração.');const family=prior?.familia; if(db.registros.some(r=>r.situacao==='Aguardando análise'&&(family?r.familia===family:r.orgaoId===user.orgaoId&&r.nome.trim().toLowerCase()===form.nome.trim().toLowerCase())))throw Error('Já existe uma submissão aguardando análise para esta API.');if(!prior&&db.registros.some(r=>r.orgaoId===user.orgaoId&&r.nome.trim().toLowerCase()===form.nome.trim().toLowerCase()))throw Error('Esta API já possui cadastro. Use Editar ou Corrigir e reenviar para preservar o histórico.');const id=crypto.randomUUID(),now=new Date().toISOString();const r={...form,id,familia:family||id,anterior:anterior||null,orgaoId:user.orgaoId,autor:user.nome,situacao:'Aguardando análise',publicacao:'Não publicado',enviado:now,revisao:prior?prior.revisao+1:1,historico:[...(prior?.historico||[]),{data:now,ator:user.nome,acao:prior?'Nova submissão enviada':'Cadastro enviado',motivo:''}]};db.registros.push(r);save(db);return r;}
 function decide(id,approve,reason){const db=read(),r=db.registros.find(r=>r.id===id);if(!r||r.situacao!=='Aguardando análise')throw Error('Esta submissão já foi analisada. Atualize a listagem.');if(!approve&&(!reason||reason.trim().length<10||reason.trim().length>1500))throw Error('Informe uma justificativa entre 10 e 1.500 caracteres.');const now=new Date().toISOString();r.situacao=approve?'Aprovado':'Reprovado';r.justificativa=approve?'':reason.trim();r.analisado=now;r.analista='Administrador demonstrativo';r.historico.push({data:now,ator:r.analista,acao:approve?'Aprovado e publicado':'Reprovado',motivo:r.justificativa});if(approve){db.registros.filter(x=>x.familia===r.familia&&x.id!==id&&x.publicacao==='Publicado').forEach(x=>x.publicacao='Substituído');r.publicacao='Publicado';}db.notificacoes.unshift({id:crypto.randomUUID(),registro:id,orgaoId:r.orgaoId,data:now,lida:false,texto:approve?`A API ${r.nome} foi aprovada e publicada.`:`A API ${r.nome} foi reprovada. Consulte a justificativa.`});save(db);return r;}
 function published(){return read().registros.filter(r=>r.situacao==='Aprovado'&&r.publicacao==='Publicado').map(r=>({...r,status:'Ativo',atualizado:r.dataAtualizacao.split('-').reverse().join('/'),baseSistema:r.base,comoAcessar:r.acesso,detalhamento:r.tecnico,operacoesDetalhadas:r.operacoes,operacoes:r.operacoes.map(o=>o.nome+(o.entrada?'\nParâmetros de entrada: '+o.entrada:'')+(o.saida?'\nParâmetros de saída: '+o.saida:'')).join('\n'),contatos:r.contato&&Object.values(r.contato).some(Boolean)?[r.contato]:[]}));}
 function markRead(id){const db=read(),n=db.notificacoes.find(n=>n.id===id);if(n){n.lida=true;save(db);}}
 window.CedenteStore={KEY,DISP_KEY,orgaos,categorias,read,submit,decide,published,markRead,readDisponibilizacoes,submitDisponibilizacao,decideDisponibilizacao};
})();
