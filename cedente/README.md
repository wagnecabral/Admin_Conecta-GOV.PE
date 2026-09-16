# Módulo de Cedente

Proposta funcional e protótipo navegável do cadastro de APIs para publicação no Conecta GOV.PE.

## Caminhos

- Portal: `portal/index.html` → Cedente → Acessar pelo Expresso.
- Cedente: `cedente/index.html` → conta demonstrativa → APIs → Cadastrar.
- Administrador: `backoffice/index.html#cedentes` → APIs de cedentes → Analisar.
- Catálogo: `portal/index.html#catalogo` → categoria → API aprovada.

## Regras propostas para completar o fluxo

1. Autenticar pelo Expresso e verificar perfil Cedente ativo e vínculo com órgão. Autenticação não substitui autorização. A conta sem perfil demonstra o acesso negado.
2. Fixar o órgão conforme vínculo. Sigla significa sigla do órgão, preenchida automaticamente. Se a intenção for sigla da API, criar um campo independente após confirmação.
3. O botão Salvar valida todos os campos e envia uma submissão para Aguardando análise. Não há rascunho nesta versão; salvar rascunho pode ser incluído como evolução.
4. Manter duas informações na grid: Situação da análise (Aguardando análise, Aprovado, Reprovado) e Status de publicação (Não publicado, Publicado, Substituído). O cedente consulta esses valores; não pode escolher Aprovado ou Reprovado.
5. Bloquear a edição da submissão pendente. O administrador visualiza todos os campos, operações, parâmetros e histórico antes da decisão.
6. Aprovar exige confirmação. No protótipo, a aprovação e a publicação do registro local são feitas na mesma gravação. Apenas a versão aprovada e publicada aparece no catálogo.
7. Reprovar exige justificativa de 10 a 1.500 caracteres, registra autor/data/hora e cria notificação interna ao órgão cedente.
8. Ao abrir uma API reprovada, exibir automaticamente o modal da justificativa. Corrigir e reenviar inicia um novo cadastro preenchido com os dados anteriores, vinculado à submissão original. A reprovação anterior não é apagada.
9. Editar API aprovada também gera nova submissão. Manter a versão publicada anterior até nova aprovação. A aprovação da nova submissão substitui a anterior no catálogo sem duplicá-la.
10. Impedir cadastro independente com mesmo nome no mesmo órgão e mais de uma submissão pendente da mesma API. Em produção, definir identificador estável da API, unicidade e relação entre versões; o nome isolado não deve ser a única chave técnica.
11. Notificar aprovação e reprovação internamente. E-mail ao responsável cadastrado no SSO é uma evolução recomendada; não utilizar automaticamente o contato público da documentação como destinatário operacional.
12. Preservar histórico com vínculo entre submissões, ator, data/hora, decisão e justificativa. Não permitir aprovação automática pelo próprio cedente.

## Campos e limites

Os limites informados foram preservados: Nome 150; Descrição 1.500; Principais Operações 100 por operação; Parâmetros de Entrada e Saída 1.500 cada, por operação; Base/Sistema de Origem 50; Como acessar 500; Detalhamento Técnico 500.

Limites complementares propostos: Versão 30; Sigla do órgão 20; Contato Nome 150; E-mail 254; Telefone 20; Função 100; justificativa de reprovação 10 a 1.500. Campos obrigatórios não aceitam apenas espaços. Contatos permanecem opcionais; validar e-mail apenas quando preenchido.

Categoria usa cadastro controlado. Data de atualização corresponde à atualização informada da API, separada da data/hora de envio. A data não pode ser futura nesta proposta. O filtro usa período de envio, com limites inclusivos. Confirmar se o produto prefere filtrar pela data de atualização da API.

Há pelo menos uma operação e cada uma possui seu próprio par de parâmetros de entrada/saída. É possível adicionar e remover operações; a última não pode ser removida. Operações de mesmo nome são rejeitadas na mesma submissão.

## Dependências para produção

- Contrato SSO Expresso, atributos de perfil/órgão, provisionamento, renovação e encerramento da sessão.
- Autorização no servidor por órgão e ação, e persistência em banco; não confiar em parâmetros de URL ou dados enviados pelo navegador.
- Em caso de separação entre aprovação e indexação do catálogo, usar estado de publicação pendente/erro, novas tentativas idempotentes e tratamento operacional. Aprovação não pode ser anunciada como publicação concluída antes da confirmação.
- API de notificações e eventual serviço de e-mail, com destinatários e política de novas tentativas definidos.
- Política para despublicação, revogação, arquivamento e revisão de APIs já disponíveis; estas operações não estão incluídas.
- Definir convivência de versões antigas, prazo de análise, responsável substituto e aviso de pendência.
- Definir quais contatos podem ser públicos e proibir senhas/tokens na documentação. Publicar a descrição no catálogo não cria endpoints nem provisiona infraestrutura ou credenciais da API.

## Limites da demonstração

A autenticação Expresso e o perfil administrativo são simulados. O contexto do administrador é demonstrativo e não representa um controle de segurança. Os cadastros, decisões e notificações usam localStorage, exclusivamente no navegador e origem atuais; não são enviados para um servidor e não ficam disponíveis para outros usuários/dispositivos. Não inserir credenciais reais.

Os registros existentes do catálogo são preservados; os novos cadastros aprovados são adicionados a eles. A integração do cadastro do cedente está no portal canônico `portal/index.html`, sem substituir páginas antigas de outros diretórios.
