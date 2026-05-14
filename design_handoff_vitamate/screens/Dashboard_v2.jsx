// VitaMate — Main dashboard (refined v2)
// More whitespace, softer sage, bigger AI panel, subtle glassmorphism.

// Softer sage variants used locally so the rest of the system stays as-is.
const S = {
  pageBg:    '#F4EFE3',                 // warmer canvas, slightly deeper than bg
  cardGlass: 'rgba(255,255,255,0.62)',  // glass card surface
  cardSolid: '#FCFAF4',
  sageMist:  '#E4ECDB',
  sageHush:  '#CFDBC0',
  sageSoft:  '#A7BB99',                 // softer than sage400
  sageDeep:  '#6E8961',                 // softer than sage600
  sageInk:   '#3D4F33',
  glassBorder: 'rgba(255,255,255,0.7)',
  shadowSoft: '0 1px 0 rgba(31,42,27,0.03), 0 8px 24px -14px rgba(31,42,27,0.10), 0 30px 60px -40px rgba(31,42,27,0.12)',
};

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
      background: 'transparent',
      borderRight: `1px solid ${V.lineSoft}`,
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 36px' }}>
        <Logo size={28} color={S.sageDeep}/>
        <span style={{ fontFamily: fonts.display, fontSize: 21, letterSpacing: -0.2, fontWeight: 400 }}>VitaMate</span>
      </div>

      {nav.map(n => {
        const I = Icons[n.icon];
        const a = active === n.id;
        return (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 14px', borderRadius: 14,
            background: a ? 'rgba(255,255,255,0.7)' : 'transparent',
            color: a ? S.sageInk : V.inkSoft,
            fontSize: 14, fontWeight: a ? 500 : 400, cursor: 'pointer',
            border: a ? `1px solid ${S.sageMist}` : `1px solid transparent`,
            boxShadow: a ? '0 4px 10px -8px rgba(31,42,27,0.12)' : 'none',
          }}>
            <I size={18} stroke={a ? S.sageDeep : V.mute}/>
            <span>{n.label}</span>
          </div>
        );
      })}

      <div style={{ flex: 1 }}/>

      <div style={{
        background: 'rgba(255,255,255,0.5)',
        border: `1px solid ${V.lineSoft}`,
        borderRadius: 18, padding: 18, marginTop: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 10, background: S.sageMist,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icons.sun size={14} stroke={S.sageDeep}/>
          </div>
          <span style={{ fontSize: 12, color: V.inkSoft, fontWeight: 500 }}>Daily window</span>
        </div>
        <div style={{ fontFamily: fonts.sub, fontSize: 13, color: V.inkSoft, lineHeight: 1.5, fontWeight: 300 }}>
          Two soft things left for today. No hurry.
        </div>
      </div>
    </aside>
  );
};

// Tiny weekly trend chart
const WeekTrend = ({ data, color = S.sageSoft, width = 260, height = 90 }) => {
  const max = Math.max(...data, 1);
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, height - (v / max) * (height - 16) - 8]);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="wt2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#wt2)"/>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => i === pts.length - 1 && (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="10" fill={color} opacity="0.16"/>
          <circle cx={p[0]} cy={p[1]} r="4" fill={color}/>
          <circle cx={p[0]} cy={p[1]} r="2" fill="#fff"/>
        </g>
      ))}
    </svg>
  );
};

// Cleaner metric card — focus on one number, soft ring, single supporting line.
const MetricCard = ({ icon, label, value, unit, sub, ringValue, color, accent }) => {
  const I = Icons[icon];
  return (
    <div style={{
      background: S.cardGlass,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: `1px solid ${S.glassBorder}`,
      borderRadius: 26,
      padding: '22px 24px 22px',
      boxShadow: S.shadowSoft,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{ width: 34, height: 34, borderRadius: 12, background: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I size={16} stroke={color}/>
        </div>
        <span style={{ fontSize: 13, color: V.inkSoft, fontWeight: 500, letterSpacing: 0.1 }}>{label}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
            <span style={{ fontFamily: fonts.display, fontWeight: 300, fontSize: 40, lineHeight: 1, color: V.ink, letterSpacing: -0.5 }}>{value}</span>
            <span style={{ fontFamily: fonts.sub, fontSize: 14, color: V.mute, fontWeight: 400 }}>{unit}</span>
          </div>
          <div style={{ fontSize: 12.5, color: V.mute, marginTop: 8, lineHeight: 1.4, maxWidth: 130 }}>{sub}</div>
        </div>
        <Ring size={64} stroke={6} value={ringValue} color={color} track={accent}/>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div style={{
      display: 'flex', width: '100%', height: '100%',
      background: `radial-gradient(900px 500px at 90% -10%, ${S.sageMist} 0%, transparent 60%),
                   radial-gradient(700px 400px at -5% 110%, ${V.clayLight}33 0%, transparent 65%),
                   ${S.pageBg}`,
      fontFamily: fonts.ui, color: V.ink,
    }}>
      <Sidebar active="home"/>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 48px 36px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: V.mute, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>
              Tuesday · May 14
            </div>
            <h1 style={{ fontFamily: fonts.display, fontWeight: 300, fontSize: 38, margin: 0, letterSpacing: -0.8, color: S.sageInk }}>
              Good morning, <span style={{ fontStyle: 'italic', color: S.sageDeep, fontWeight: 400 }}>Maya</span>
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.6)', padding: '10px 18px', borderRadius: 999,
              border: `1px solid ${V.lineSoft}`, fontSize: 13.5, color: V.mute,
              backdropFilter: 'blur(8px)', minWidth: 260,
            }}>
              <Icons.search size={15} stroke={V.mute}/>
              <span>Log a meal, drink, mood…</span>
            </div>
            <button style={{
              background: 'rgba(255,255,255,0.6)', border: `1px solid ${V.lineSoft}`, borderRadius: 999,
              width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}>
              <Icons.bell size={16} stroke={V.inkSoft}/>
            </button>
            <button style={{
              background: S.sageDeep, color: '#fff', border: 'none', borderRadius: 999,
              padding: '11px 20px', display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13.5, fontWeight: 500, fontFamily: fonts.ui, cursor: 'pointer',
              boxShadow: '0 10px 22px -10px rgba(110,137,97,0.55)',
            }}>
              <Icons.plus size={14} stroke="#fff" sw={2.2}/> Log today
            </button>
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          <MetricCard icon="flame"   label="Calories" value="1,420" unit="kcal"
            sub="A gentle ~480 to go"
            ringValue={0.74} color={V.clay}   accent="#F2E3D6"/>
          <MetricCard icon="protein" label="Protein"  value="58"    unit="g"
            sub="Lunch is your anchor"
            ringValue={0.64} color={S.sageDeep} accent={S.sageMist}/>
          <MetricCard icon="drop"    label="Water"    value="5"     unit="glasses"
            sub="Three more before sunset"
            ringValue={0.62} color="#8FB0C4" accent="#E5EDF2"/>
          <MetricCard icon="moon"    label="Sleep"    value="7h 12m" unit=""
            sub="Deep cycle was kind"
            ringValue={0.90} color="#9890B0" accent="#ECE7F0"/>
        </div>

        {/* Hero AI panel + trend rail */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>
          {/* AI hero */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 32,
            background: `linear-gradient(135deg, ${S.sageInk} 0%, ${S.sageDeep} 100%)`,
            color: '#fff',
            boxShadow: '0 20px 50px -20px rgba(61,79,51,0.45), 0 6px 20px -10px rgba(61,79,51,0.25)',
          }}>
            {/* organic blooms */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(500px 280px at 90% -10%, rgba(255,255,255,0.10), transparent 60%),
                           radial-gradient(360px 220px at -5% 110%, ${V.clay}40, transparent 65%),
                           radial-gradient(220px 220px at 70% 90%, ${S.sageHush}26, transparent 70%)`,
            }}/>
            {/* leaf flourish */}
            <svg width="220" height="220" style={{ position: 'absolute', right: -30, top: -20, opacity: 0.10 }} viewBox="0 0 220 220" fill="none">
              <path d="M200 20C90 20 30 70 30 150c0 14 4 27 11 38" stroke="#fff" strokeWidth="1.5"/>
              <path d="M200 20c0 100-55 160-130 160-12 0-23-2-33-7" stroke="#fff" strokeWidth="1.5"/>
              <path d="M40 200l85-85" stroke="#fff" strokeWidth="1.5"/>
            </svg>

            <div style={{ position: 'relative', padding: '28px 32px 26px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14,
                    background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.18)' }}>
                    <Icons.spark size={20} stroke="#fff"/>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, opacity: 0.65, letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 500 }}>
                      Vita · your companion
                    </div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 22, marginTop: 2, letterSpacing: -0.2 }}>
                      Today's gentle nudges
                    </div>
                  </div>
                </div>
                <span style={{
                  fontSize: 11, padding: '6px 12px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.16)',
                  letterSpacing: 0.4, fontWeight: 500,
                }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: '#C9DCB4', marginRight: 7 }}/>
                  Listening
                </span>
              </div>

              {/* Big quote */}
              <div style={{
                fontFamily: fonts.display, fontWeight: 200, fontSize: 26, lineHeight: 1.25,
                letterSpacing: -0.4, maxWidth: 600, marginBottom: 22,
              }}>
                You slept beautifully — let's protect that.
                <br/>
                <span style={{ opacity: 0.6 }}>A little more protein at lunch could carry you through the 3pm dip.</span>
              </div>

              {/* Recommendation cards row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 'auto' }}>
                {[
                  { i: 'bowl', t: 'Add 20g protein at lunch',  s: 'Greek yogurt or lentil bowl' },
                  { i: 'drop', t: 'Two glasses by noon',       s: 'You under-drink on Tuesdays' },
                  { i: 'walk', t: '15-min walk after work',    s: 'Helps you sleep by 11' },
                ].map(n => {
                  const I = Icons[n.i];
                  return (
                    <div key={n.t} style={{
                      background: 'rgba(255,255,255,0.10)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      borderRadius: 16, padding: '14px 16px 14px',
                      border: '1px solid rgba(255,255,255,0.14)',
                      display: 'flex', flexDirection: 'column', gap: 8,
                    }}>
                      <div style={{ width: 30, height: 30, borderRadius: 10,
                        background: 'rgba(255,255,255,0.14)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <I size={15} stroke="#fff"/>
                      </div>
                      <div style={{ fontFamily: fonts.sub, fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>
                        {n.t}
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.45 }}>{n.s}</div>
                    </div>
                  );
                })}
              </div>

              {/* Footer CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
                <button style={{
                  background: '#fff', color: S.sageInk, border: 'none', borderRadius: 999,
                  padding: '11px 20px', fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Talk with Vita
                  <Icons.arrow size={14} stroke={S.sageInk} sw={2}/>
                </button>
                <button style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999,
                  padding: '10px 16px', fontSize: 13, fontWeight: 400, fontFamily: fonts.ui,
                  cursor: 'pointer',
                }}>
                  Why these?
                </button>
              </div>
            </div>
          </div>

          {/* Right rail — balance + trend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0 }}>
            {/* Balance score */}
            <div style={{
              background: S.cardGlass,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: `1px solid ${S.glassBorder}`,
              borderRadius: 26, padding: '22px 24px',
              boxShadow: S.shadowSoft,
            }}>
              <div style={{ fontSize: 12, color: V.mute, fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 14 }}>
                This week's rhythm
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: fonts.display, fontSize: 56, fontWeight: 300, color: S.sageInk, letterSpacing: -1, lineHeight: 1 }}>82</span>
                <span style={{ fontFamily: fonts.sub, fontSize: 14, color: V.mute }}>balance</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6,
                background: S.sageMist, color: S.sageDeep, padding: '4px 10px', borderRadius: 999,
                fontSize: 12, fontWeight: 500 }}>
                <Icons.arrowUp size={11} sw={2.2} stroke={S.sageDeep}/> +7 from last week
              </div>
              <div style={{ marginTop: 18, marginLeft: -4 }}>
                <WeekTrend data={[60, 64, 58, 72, 70, 78, 82]} color={S.sageSoft} width={260} height={80}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: V.mute, marginTop: 6, padding: '0 4px' }}>
                  {['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'].map((d, i) => (
                    <span key={d} style={{ fontWeight: i === 6 ? 600 : 400, color: i === 6 ? S.sageDeep : V.mute }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Insight card */}
            <div style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: `1px solid ${S.glassBorder}`,
              borderRadius: 26, padding: '22px 24px',
              boxShadow: S.shadowSoft,
              flex: 1, display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: S.sageDeep, marginBottom: 14 }}>
                <Icons.trend size={14} stroke={S.sageDeep}/>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Pattern noticed</span>
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 300, fontSize: 22, lineHeight: 1.3, color: S.sageInk, letterSpacing: -0.2 }}>
                You sleep <em style={{ fontStyle: 'italic', color: S.sageDeep, fontWeight: 400 }}>42 min longer</em> on days you walk before 6pm.
              </div>
              <div style={{ fontSize: 13, color: V.inkSoft, marginTop: 14, lineHeight: 1.5 }}>
                Based on the last 21 days. Want me to nudge you for an afternoon stroll?
              </div>
              <button style={{
                marginTop: 'auto',
                alignSelf: 'flex-start',
                background: 'transparent', border: 'none',
                color: S.sageDeep, fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, paddingTop: 16,
              }}>
                Yes, gently <Icons.arrow size={13} stroke={S.sageDeep} sw={2}/>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

window.DashboardPage = DashboardPage;
