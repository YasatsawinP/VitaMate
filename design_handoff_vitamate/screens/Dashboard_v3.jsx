// VitaMate — Main dashboard (v3, calm/minimal)
// Three vitals → one insight → one action. Nothing more.

const S = {
  pageBg:    '#F4EFE3',
  sageMist:  '#E4ECDB',
  sageHush:  '#CFDBC0',
  sageSoft:  '#A7BB99',
  sageDeep:  '#6E8961',
  sageInk:   '#3D4F33',
  glass:     'rgba(255,255,255,0.62)',
  glassBorder: 'rgba(255,255,255,0.75)',
  shadow:    '0 1px 0 rgba(31,42,27,0.03), 0 10px 30px -18px rgba(31,42,27,0.10), 0 40px 80px -50px rgba(31,42,27,0.10)',
};

// Sidebar is kept for the Recommendations page; this dashboard intentionally
// uses a slim top bar instead so the layout feels lighter.
const Sidebar = ({ active = 'home' }) => {
  const nav = [
    { id: 'home',    icon: 'home',    label: 'Today' },
    { id: 'trends',  icon: 'chart',   label: 'Trends' },
    { id: 'ai',      icon: 'chat',    label: 'Vita' },
    { id: 'journal', icon: 'journal', label: 'Journal' },
    { id: 'settings',icon: 'gear',    label: 'Settings' },
  ];
  return (
    <aside style={{
      width: 240, padding: '36px 22px',
      borderRight: `1px solid ${V.lineSoft}`,
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 36px' }}>
        <Logo size={28} color={S.sageDeep}/>
        <span style={{ fontFamily: fonts.display, fontSize: 21, letterSpacing: -0.2, fontWeight: 400 }}>VitaMate</span>
      </div>
      {nav.map(n => {
        const I = Icons[n.icon]; const a = active === n.id;
        return (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 14px', borderRadius: 14,
            background: a ? 'rgba(255,255,255,0.7)' : 'transparent',
            color: a ? S.sageInk : V.inkSoft,
            fontSize: 14, fontWeight: a ? 500 : 400, cursor: 'pointer',
            border: a ? `1px solid ${S.sageMist}` : `1px solid transparent`,
          }}>
            <I size={18} stroke={a ? S.sageDeep : V.mute}/>
            <span>{n.label}</span>
          </div>
        );
      })}
    </aside>
  );
};

// Single vital — big ring, one number, one label. Nothing else.
const Vital = ({ icon, label, value, unit, ringValue, color, accent }) => {
  const I = Icons[icon];
  return (
    <div style={{
      background: S.glass,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: `1px solid ${S.glassBorder}`,
      borderRadius: 28, padding: '32px 28px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: '0 1px 0 rgba(31,42,27,0.03), 0 16px 36px -22px rgba(31,42,27,0.14)',
    }}>
      <Ring size={120} stroke={9} value={ringValue} color={color} track={accent}>
        <I size={20} stroke={color}/>
      </Ring>
      <div style={{ marginTop: 18, fontSize: 12, color: V.mute, letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 6 }}>
        <span style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 300, color: V.ink, letterSpacing: -0.5, lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: fonts.sub, fontSize: 13, color: V.mute }}>{unit}</span>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      background: `radial-gradient(1100px 600px at 85% -10%, ${S.sageMist} 0%, transparent 60%),
                   radial-gradient(800px 500px at -5% 110%, ${V.clayLight}30 0%, transparent 65%),
                   ${S.pageBg}`,
      fontFamily: fonts.ui, color: V.ink,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Slim top bar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '26px 56px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={26} color={S.sageDeep}/>
          <span style={{ fontFamily: fonts.display, fontSize: 19, letterSpacing: -0.2, fontWeight: 400, color: S.sageInk }}>VitaMate</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['Today', 'Vita', 'Journal'].map((t, i) => (
            <span key={t} style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer',
              color: i === 0 ? S.sageInk : V.mute,
              fontWeight: i === 0 ? 500 : 400,
              background: i === 0 ? 'rgba(255,255,255,0.7)' : 'transparent',
              border: i === 0 ? `1px solid ${S.sageMist}` : '1px solid transparent',
            }}>{t}</span>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{
            background: 'rgba(255,255,255,0.6)', border: `1px solid ${V.lineSoft}`, borderRadius: 999,
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}>
            <Icons.bell size={15} stroke={V.inkSoft}/>
          </button>
          <div style={{
            width: 40, height: 40, borderRadius: 999, background: V.sand, color: V.rust,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: fonts.display, fontSize: 15, fontWeight: 500,
            border: '2px solid rgba(255,255,255,0.85)',
          }}>M</div>
        </div>
      </header>

      {/* Centered narrow column */}
      <main style={{
        flex: 1, overflow: 'hidden',
        display: 'flex', justifyContent: 'center', padding: '12px 56px 56px',
      }}>
        <div style={{ width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 36 }}>

          {/* Greeting */}
          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <div style={{ fontSize: 12, color: V.mute, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
              Tuesday · May 14
            </div>
            <h1 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 200,
              fontSize: 46, letterSpacing: -1, color: S.sageInk, lineHeight: 1.05,
            }}>
              Good morning, <em style={{ fontStyle: 'italic', color: S.sageDeep, fontWeight: 300 }}>Maya.</em>
            </h1>
            <p style={{ margin: '14px 0 0', fontSize: 15, color: V.inkSoft, fontFamily: fonts.sub, fontWeight: 300 }}>
              Take it easy today. You've already done the hardest part — showing up.
            </p>
          </div>

          {/* Three vitals */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <Vital icon="flame" label="Calories" value="1,420" unit="kcal"
              ringValue={0.74} color={V.clay} accent="#F2E3D6"/>
            <Vital icon="drop"  label="Water"    value="5"     unit="of 8 glasses"
              ringValue={0.62} color="#8FB0C4" accent="#E5EDF2"/>
            <Vital icon="moon"  label="Sleep"    value="7h 12m" unit="restful"
              ringValue={0.90} color="#9890B0" accent="#ECE7F0"/>
          </div>

          {/* Hero AI insight */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 32,
            background: `linear-gradient(135deg, ${S.sageInk} 0%, ${S.sageDeep} 100%)`,
            color: '#fff',
            padding: '40px 44px',
            boxShadow: '0 24px 60px -24px rgba(61,79,51,0.45), 0 8px 24px -12px rgba(61,79,51,0.2)',
          }}>
            {/* organic */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(500px 280px at 95% -10%, rgba(255,255,255,0.10), transparent 60%),
                           radial-gradient(420px 260px at -5% 110%, ${V.clay}38, transparent 70%)`
            }}/>
            <svg width="180" height="180" style={{ position: 'absolute', right: -20, top: -10, opacity: 0.10 }} viewBox="0 0 180 180" fill="none">
              <path d="M165 15C75 15 25 55 25 125c0 12 4 23 10 32" stroke="#fff" strokeWidth="1.4"/>
              <path d="M165 15c0 85-45 135-110 135-10 0-19-1-28-5" stroke="#fff" strokeWidth="1.4"/>
              <path d="M35 165l75-75" stroke="#fff" strokeWidth="1.4"/>
            </svg>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12,
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.spark size={17} stroke="#fff"/>
              </div>
              <span style={{ fontSize: 11, opacity: 0.7, letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600 }}>
                Vita · a note for you
              </span>
            </div>

            <div style={{ position: 'relative', maxWidth: 640 }}>
              <p style={{
                margin: 0, fontFamily: fonts.display, fontWeight: 200,
                fontSize: 34, lineHeight: 1.3, letterSpacing: -0.5,
              }}>
                Your sleep was a kindness to your body last night.
                <span style={{ opacity: 0.6 }}> Let's keep today soft — light meals, slow water, a little sunlight.</span>
              </p>
            </div>
          </div>

          {/* One recommended action */}
          <div style={{
            background: S.glass,
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${S.glassBorder}`,
            borderRadius: 24, padding: '22px 26px',
            display: 'flex', alignItems: 'center', gap: 20,
            boxShadow: '0 12px 30px -20px rgba(31,42,27,0.12)',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, flexShrink: 0,
              background: S.sageMist,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icons.walk size={22} stroke={S.sageDeep}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: S.sageDeep, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4 }}>
                Today, just one thing
              </div>
              <div style={{ fontFamily: fonts.sub, fontSize: 17, fontWeight: 500, color: V.ink, letterSpacing: -0.1 }}>
                A quiet 10-minute walk before lunch.
              </div>
            </div>
            <button style={{
              background: S.sageInk, color: '#fff', border: 'none', borderRadius: 999,
              padding: '12px 22px', fontSize: 13.5, fontWeight: 500, fontFamily: fonts.ui,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 10px 22px -10px rgba(61,79,51,0.55)',
            }}>
              Add to today
              <Icons.arrow size={13} stroke="#fff" sw={2}/>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

window.DashboardPage = DashboardPage;
