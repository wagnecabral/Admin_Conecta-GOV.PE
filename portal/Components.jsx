// Padrão Digital PE — Shared UI Components
// Load as: <script type="text/babel" src="Components.jsx"></script>

// ── GovBar ────────────────────────────────────────────────────────
function GovBar() {
  return (
    <div style={{
      background: '#001A7A', height: 32, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px',
      borderBottom: '1px solid #0034B7', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#FFCD37', fontSize: 13 }}>★</span>
        <span style={{ color: '#F8FAFC', fontSize: 12, fontFamily: 'Inter' }}>Governo de Pernambuco</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          background: '#0034B7', borderRadius: 100, padding: '2px 10px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {['A-','A','A+'].map(t => (
            <span key={t} style={{ color: '#F8FAFC', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter', fontWeight: 700 }}>{t}</span>
          ))}
        </div>
        <span style={{ color: '#F8FAFC', fontSize: 13, cursor: 'pointer' }} title="Contraste">◐</span>
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────
function Header({ activeMenu = 'Início', onMenuClick }) {
  const menuItems = ['Início', 'Serviços', 'Notícias', 'Sobre', 'Contato'];
  return (
    <div style={{
      background: '#F8FAFC', borderBottom: '1px solid #CED2D7',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: 84, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 48, height: 48, background: '#0034B7', borderRadius: 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#FFCD37', fontSize: 22 }}>★</span>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#28272C', letterSpacing: '-0.15px', fontFamily: 'Inter' }}>
            Portal de Serviços
          </div>
          <div style={{ fontSize: 12, color: '#0034B7', fontFamily: 'Inter' }}>
            Governo de Pernambuco
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {menuItems.map(item => (
          <div key={item} onClick={() => onMenuClick && onMenuClick(item)}
            style={{
              padding: '8px 14px', fontSize: 14, fontWeight: item === activeMenu ? 700 : 500,
              color: item === activeMenu ? '#0034B7' : '#28272C',
              borderBottom: item === activeMenu ? '2px solid #0034B7' : '2px solid transparent',
              cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.15s',
            }}>
            {item}
          </div>
        ))}
      </div>
      <div
        onClick={() => onMenuClick && onMenuClick('Acessar')}
        style={{
          padding: '8px 14px', fontSize: 14, fontWeight: 500,
          color: '#28272C',
          borderBottom: '2px solid transparent',
          cursor: 'pointer', fontFamily: 'Inter', transition: 'all 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderBottomColor = '#FFCD37';
          e.currentTarget.style.color = '#0034B7';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderBottomColor = 'transparent';
          e.currentTarget.style.color = '#28272C';
        }}
      >
        Acessar
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <div style={{
      background: '#0034B7', color: '#F8FAFC', padding: '40px 40px 24px',
      marginTop: 'auto',
    }}>
      <div style={{ display: 'flex', gap: 48, marginBottom: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ color: '#FFCD37', fontSize: 24 }}>★</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, fontFamily: 'Inter' }}>GOVERNO DE</div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Inter' }}>PERNAMBUCO</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(248,250,252,0.7)', lineHeight: 1.6, fontFamily: 'Inter', maxWidth: 260 }}>
            Portal unificado de serviços digitais do Estado de Pernambuco.
          </p>
        </div>
        {[
          { title: 'Serviços', links: ['Educação', 'Saúde', 'Segurança', 'Cultura'] },
          { title: 'Governo', links: ['Sobre', 'Secretarias', 'Legislação', 'Transparência'] },
          { title: 'Suporte', links: ['Fale Conosco', 'Acessibilidade', 'Privacidade', 'Termos de Uso'] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, fontFamily: 'Inter' }}>{col.title}</div>
            {col.links.map(l => (
              <div key={l} style={{ fontSize: 12, color: 'rgba(248,250,252,0.7)', marginBottom: 6, cursor: 'pointer', fontFamily: 'Inter' }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(248,250,252,0.15)', paddingTop: 16, fontSize: 11, color: 'rgba(248,250,252,0.5)', fontFamily: 'Inter' }}>
        © 2025 Governo do Estado de Pernambuco — Padrão Digital PE v1.0-beta
      </div>
    </div>
  );
}

// ── Button ────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', onClick, style = {} }) {
  const heights = { sm: 36, md: 40, lg: 48 };
  const paddings = { sm: '0 16px', md: '0 20px', lg: '0 24px' };
  const fontSizes = { sm: 13, md: 14, lg: 16 };
  const variants = {
    primary:   { background: '#0034B7', color: '#fff', border: 'none' },
    secondary: { background: '#fff', color: '#0034B7', border: '1.5px solid #0034B7' },
    danger:    { background: '#AC1010', color: '#fff', border: 'none' },
    ghost:     { background: 'transparent', color: '#0034B7', border: 'none', textDecoration: 'underline' },
    white:     { background: '#fff', color: '#0034B7', border: 'none' },
  };
  return (
    <button onClick={onClick} style={{
      height: heights[size], padding: paddings[size], fontSize: fontSizes[size],
      fontWeight: 700, fontFamily: 'Inter', borderRadius: 5, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      ...variants[variant], ...style,
    }}>
      {children}
    </button>
  );
}

// ── Input ─────────────────────────────────────────────────────────
function Input({ label, placeholder, hint, error, value, onChange, type = 'text' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 500, color: '#28272C', fontFamily: 'Inter' }}>{label}</label>}
      <input
        type={type} value={value} onChange={onChange}
        placeholder={placeholder}
        style={{
          height: 48, borderRadius: 5, padding: '0 14px',
          border: `1px solid ${error ? '#AC1010' : '#CED2D7'}`,
          fontSize: 14, fontFamily: 'Inter', color: '#28272C',
          background: '#fff', outline: 'none',
          boxShadow: error ? '0 0 0 3px rgba(172,16,16,0.1)' : 'none',
        }}
        onFocus={e => { e.target.style.borderColor = '#0034B7'; e.target.style.boxShadow = '0 0 0 3px rgba(0,52,183,0.12)'; }}
        onBlur={e => { e.target.style.borderColor = error ? '#AC1010' : '#CED2D7'; e.target.style.boxShadow = 'none'; }}
      />
      {hint && !error && <span style={{ fontSize: 12, color: '#494C57', fontFamily: 'Inter' }}>{hint}</span>}
      {error && <span style={{ fontSize: 12, color: '#AC1010', fontFamily: 'Inter' }}>{error}</span>}
    </div>
  );
}

// ── ServiceCard ───────────────────────────────────────────────────
function ServiceCard({ icon, title, description, category, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 5, border: '1px solid #E7E9EB',
      padding: 24, cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,26,122,0.12)'; e.currentTarget.style.borderColor = '#99C6FF'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#E7E9EB'; }}
    >
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#28272C', marginBottom: 6, fontFamily: 'Inter', lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#494C57', lineHeight: 1.5, fontFamily: 'Inter' }}>{description}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{
          fontSize: 11, fontWeight: 500, color: '#0034B7', background: '#E6F3FF',
          padding: '3px 8px', borderRadius: 100, fontFamily: 'Inter',
        }}>{category}</span>
        <span style={{ color: '#0034B7', fontSize: 16 }}>→</span>
      </div>
    </div>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────
function Breadcrumb({ items }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontFamily: 'Inter' }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: '#CED2D7' }}>›</span>}
          <span style={{ color: i === items.length - 1 ? '#28272C' : '#0034B7', cursor: i < items.length - 1 ? 'pointer' : 'default', fontWeight: i === items.length - 1 ? 500 : 400 }}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Alert / Toast ─────────────────────────────────────────────────
function Alert({ type = 'info', message }) {
  const configs = {
    info:    { bg: '#E6F3FF', border: '#99C6FF', color: '#0034B7', icon: 'ℹ' },
    success: { bg: '#EAFBD7', border: '#86D562', color: '#2B6418', icon: '✓' },
    danger:  { bg: '#FFE4E4', border: '#E45F5F', color: '#AC1010', icon: '!' },
    warning: { bg: '#FFF6CE', border: '#FFB70C', color: '#B77706', icon: '⚠' },
  };
  const cfg = configs[type];
  return (
    <div style={{
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      borderRadius: 5, padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ color: cfg.color, fontWeight: 700, fontSize: 15 }}>{cfg.icon}</span>
      <span style={{ fontSize: 13, color: cfg.color, fontFamily: 'Inter' }}>{message}</span>
    </div>
  );
}

// Export all to global scope
Object.assign(window, { GovBar, Header, Footer, Btn, Input, ServiceCard, Breadcrumb, Alert });
