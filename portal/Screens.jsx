// Padrão Digital PE — Screen Compositions
// Load as: <script type="text/babel" src="Screens.jsx"></script>

const SERVICES = [
  { icon: '🎓', title: 'Matrícula Escolar', description: 'Realize a matrícula ou transferência na rede estadual de ensino.', category: 'Educação' },
  { icon: '🏥', title: 'Agendamento de Saúde', description: 'Agende consultas e exames na rede pública estadual.', category: 'Saúde' },
  { icon: '📄', title: 'Emissão de Documentos', description: 'Solicite certidões e documentos oficiais do governo estadual.', category: 'Documentos' },
  { icon: '🚗', title: 'Licenciamento de Veículo', description: 'Emita o licenciamento anual do seu veículo de forma digital.', category: 'Trânsito' },
  { icon: '💼', title: 'Auxílio ao Trabalhador', description: 'Acesse programas de apoio ao emprego e renda no estado.', category: 'Trabalho' },
  { icon: '🏠', title: 'Habitação Popular', description: 'Inscreva-se em programas habitacionais do governo estadual.', category: 'Habitação' },
  { icon: '⚡', title: 'CELPE — Serviços', description: 'Solicite ligação, religação e serviços de energia elétrica.', category: 'Utilidades' },
  { icon: '🌿', title: 'Licença Ambiental', description: 'Obtenha licenças e autorizações ambientais do CPRH.', category: 'Meio Ambiente' },
];

const CATEGORIES = ['Todos', 'Educação', 'Saúde', 'Documentos', 'Trânsito', 'Trabalho', 'Habitação'];

// ── HomeScreen ────────────────────────────────────────────────────
function HomeScreen({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Hero */}
      <div style={{
        background: '#0034B7', color: '#fff', padding: '56px 40px',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        <div style={{ maxWidth: 600 }}>
          <div style={{ fontSize: 13, color: '#99C6FF', fontWeight: 500, marginBottom: 8, fontFamily: 'Inter' }}>
            Portal de Serviços Digitais
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: 48, lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: 16,
          }}>
            Serviços públicos<br/>ao alcance de todos
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(248,250,252,0.85)', fontFamily: 'Inter', marginBottom: 24, maxWidth: 480 }}>
            Acesse serviços do Governo de Pernambuco de forma simples, rápida e segura.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn variant="white" size="lg" onClick={() => onNavigate('services')}>Ver todos os serviços</Btn>
            <Btn variant="secondary" size="lg" style={{ background: 'transparent', color: '#F8FAFC', border: '1.5px solid rgba(248,250,252,0.4)' }}>Entrar com gov.br</Btn>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{ background: '#F8FAFC', padding: '24px 40px', borderBottom: '1px solid #E7E9EB' }}>
        <div style={{ maxWidth: 600, display: 'flex', gap: 10 }}>
          <input placeholder="Buscar serviço ou assunto..." style={{
            flex: 1, height: 48, borderRadius: 5, border: '1px solid #CED2D7',
            padding: '0 16px', fontSize: 14, fontFamily: 'Inter', color: '#28272C', outline: 'none',
          }} />
          <Btn variant="primary" size="lg">Buscar</Btn>
        </div>
      </div>

      {/* Services grid */}
      <div style={{ padding: '40px 40px 0', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 22, color: '#28272C' }}>Serviços em destaque</h2>
          <Btn variant="ghost" onClick={() => onNavigate('services')}>Ver todos →</Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {SERVICES.slice(0, 4).map((s, i) => (
            <ServiceCard key={i} {...s} onClick={() => onNavigate('detail', s)} />
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div style={{ padding: '40px 40px 0' }}>
        <div style={{
          background: '#E6F3FF', border: '1px solid #99C6FF', borderRadius: 8,
          padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: '#0034B7', marginBottom: 4 }}>Novo: Login único gov.br</div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, color: '#494C57' }}>Agora você pode acessar todos os serviços com sua conta gov.br.</div>
          </div>
          <Btn variant="primary">Saiba mais</Btn>
        </div>
      </div>
      <div style={{ height: 40 }} />
    </div>
  );
}

// ── ServicesScreen ────────────────────────────────────────────────
function ServicesScreen({ onNavigate }) {
  const [activeCategory, setActiveCategory] = React.useState('Todos');
  const filtered = activeCategory === 'Todos' ? SERVICES : SERVICES.filter(s => s.category === activeCategory);
  return (
    <div style={{ padding: '32px 40px', flex: 1 }}>
      <Breadcrumb items={['Início', 'Serviços']} />
      <h1 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 28, color: '#28272C', margin: '20px 0 8px', letterSpacing: '-0.15px' }}>
        Todos os serviços
      </h1>
      <p style={{ fontSize: 14, color: '#494C57', fontFamily: 'Inter', marginBottom: 28 }}>
        {SERVICES.length} serviços disponíveis para o cidadão pernambucano
      </p>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            height: 36, padding: '0 16px', borderRadius: 100, fontSize: 13, fontWeight: 500,
            fontFamily: 'Inter', cursor: 'pointer',
            background: activeCategory === cat ? '#0034B7' : '#fff',
            color: activeCategory === cat ? '#fff' : '#28272C',
            border: `1.5px solid ${activeCategory === cat ? '#0034B7' : '#CED2D7'}`,
          }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {filtered.map((s, i) => (
          <ServiceCard key={i} {...s} onClick={() => onNavigate('detail', s)} />
        ))}
      </div>
    </div>
  );
}

// ── DetailScreen ──────────────────────────────────────────────────
function DetailScreen({ service, onNavigate }) {
  const steps = [
    'Faça login com sua conta gov.br ou CPF',
    'Preencha o formulário com seus dados pessoais',
    'Anexe os documentos solicitados',
    'Revise as informações e confirme o envio',
    'Acompanhe o status pelo portal ou e-mail',
  ];
  return (
    <div style={{ padding: '32px 40px', flex: 1 }}>
      <Breadcrumb items={['Início', 'Serviços', service.title]} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, marginTop: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>{service.icon}</span>
            <div>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#0034B7', background: '#E6F3FF', padding: '3px 8px', borderRadius: 100, fontFamily: 'Inter' }}>{service.category}</span>
              <h1 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 26, color: '#28272C', marginTop: 6, letterSpacing: '-0.15px' }}>{service.title}</h1>
            </div>
          </div>
          <p style={{ fontSize: 15, color: '#494C57', lineHeight: 1.6, fontFamily: 'Inter', marginBottom: 28, maxWidth: 560 }}>
            {service.description} Este serviço está disponível 24 horas por dia, 7 dias por semana, de forma totalmente digital e gratuita para cidadãos pernambucanos.
          </p>

          <Alert type="info" message="Para solicitar este serviço você precisará de CPF, RG e comprovante de residência." />

          <h2 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, color: '#28272C', margin: '28px 0 16px' }}>Como solicitar</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 100, background: '#0034B7',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, fontFamily: 'Inter', flexShrink: 0, marginTop: 1,
                }}>{i + 1}</div>
                <span style={{ fontSize: 14, color: '#28272C', lineHeight: 1.5, fontFamily: 'Inter' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar CTA */}
        <div>
          <div style={{ background: '#fff', border: '1px solid #E7E9EB', borderRadius: 8, padding: 24, position: 'sticky', top: 20 }}>
            <div style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16, color: '#28272C', marginBottom: 8 }}>Solicitar serviço</div>
            <div style={{ fontSize: 13, color: '#494C57', fontFamily: 'Inter', marginBottom: 20, lineHeight: 1.5 }}>Disponível online 24h. Tempo estimado: 5 a 10 dias úteis.</div>
            <Btn variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNavigate('form', service)}>
              Iniciar solicitação
            </Btn>
            <Btn variant="secondary" size="md" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
              Salvar para depois
            </Btn>
            <div style={{ borderTop: '1px solid #E7E9EB', marginTop: 20, paddingTop: 16 }}>
              <div style={{ fontSize: 12, color: '#494C57', fontFamily: 'Inter', marginBottom: 8 }}>Precisa de ajuda?</div>
              <div style={{ fontSize: 13, color: '#0034B7', fontFamily: 'Inter', cursor: 'pointer' }}>📞 0800 281 0000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FormScreen ────────────────────────────────────────────────────
function FormScreen({ service, onNavigate }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ nome: '', cpf: '', email: '', telefone: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const steps = ['Identificação', 'Dados do serviço', 'Revisão'];

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  if (submitted) return (
    <div style={{ padding: '80px 40px', textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 24, color: '#28272C', marginBottom: 12 }}>Solicitação enviada!</h2>
      <p style={{ fontSize: 15, color: '#494C57', fontFamily: 'Inter', marginBottom: 8 }}>Protocolo: <strong>PE-2025-{Math.floor(Math.random()*90000+10000)}</strong></p>
      <p style={{ fontSize: 14, color: '#494C57', fontFamily: 'Inter', marginBottom: 32 }}>Você receberá atualizações por e-mail em até 24 horas.</p>
      <Alert type="success" message="Sua solicitação foi registrada com sucesso no sistema do Governo de Pernambuco." />
      <div style={{ marginTop: 28 }}>
        <Btn variant="primary" onClick={() => onNavigate('home')}>Voltar ao início</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '32px 40px', flex: 1 }}>
      <Breadcrumb items={['Início', 'Serviços', service.title, 'Formulário']} />
      <h1 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 24, color: '#28272C', margin: '20px 0 24px', letterSpacing: '-0.15px' }}>
        {service.icon} {service.title}
      </h1>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36, maxWidth: 480 }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 100,
                background: i < step ? '#2B6418' : i === step ? '#0034B7' : '#E7E9EB',
                color: i <= step ? '#fff' : '#CED2D7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, fontFamily: 'Inter',
              }}>{i < step ? '✓' : i + 1}</div>
              <span style={{ fontSize: 11, color: i === step ? '#0034B7' : '#494C57', fontWeight: i === step ? 700 : 400, fontFamily: 'Inter', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < step ? '#2B6418' : '#E7E9EB', margin: '0 8px', marginBottom: 24 }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ maxWidth: 560 }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Input label="Nome completo *" placeholder="Seu nome completo" value={form.nome} onChange={handleChange('nome')} />
            <Input label="CPF *" placeholder="000.000.000-00" value={form.cpf} onChange={handleChange('cpf')} />
            <Input label="E-mail *" placeholder="seu@email.com" type="email" value={form.email} onChange={handleChange('email')} />
            <Input label="Telefone" placeholder="(81) 00000-0000" value={form.telefone} onChange={handleChange('telefone')} hint="Opcional — para contato em caso de dúvidas" />
          </div>
        )}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Alert type="info" message="Preencha os dados específicos do serviço solicitado." />
            <Input label="Município de residência *" placeholder="Ex: Recife" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#28272C', fontFamily: 'Inter' }}>Motivo da solicitação *</label>
              <textarea placeholder="Descreva brevemente o motivo..." style={{
                minHeight: 100, borderRadius: 5, border: '1px solid #CED2D7',
                padding: '12px 14px', fontSize: 14, fontFamily: 'Inter',
                color: '#28272C', resize: 'vertical', outline: 'none',
              }} />
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Alert type="warning" message="Revise as informações abaixo antes de enviar. Após o envio não será possível alterar." />
            <div style={{ background: '#F8FAFC', borderRadius: 5, border: '1px solid #E7E9EB', padding: 20 }}>
              {[['Nome', form.nome || 'João da Silva'], ['CPF', form.cpf || '000.000.000-00'], ['E-mail', form.email || 'joao@email.com'], ['Serviço', service.title], ['Data', new Date().toLocaleDateString('pt-BR')]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E7E9EB', fontSize: 13, fontFamily: 'Inter' }}>
                  <span style={{ color: '#494C57' }}>{k}</span>
                  <span style={{ color: '#28272C', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          {step > 0 && <Btn variant="secondary" onClick={() => setStep(s => s - 1)}>← Anterior</Btn>}
          {step < 2
            ? <Btn variant="primary" onClick={() => setStep(s => s + 1)}>Próximo →</Btn>
            : <Btn variant="primary" onClick={() => setSubmitted(true)}>Enviar solicitação</Btn>
          }
        </div>
      </div>
    </div>
  );
}

// Export screens
Object.assign(window, { HomeScreen, ServicesScreen, DetailScreen, FormScreen });
