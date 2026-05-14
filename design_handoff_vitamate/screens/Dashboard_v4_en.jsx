// VitaMate — Main dashboard (v4 — AI food input as the hero interaction)
// "Tell Vita what you ate" — natural language in, structured nutrition out.

const S = {
  pageBg:    '#F4EFE3',
  sageMist:  '#E4ECDB',
  sageHush:  '#CFDBC0',
  sageSoft:  '#A7BB99',
  sageDeep:  '#6E8961',
  sageInk:   '#3D4F33',
  glass:     'rgba(255,255,255,0.65)',
  glassBorder: 'rgba(255,255,255,0.75)',
};

// Sidebar is kept for the Recommendations page (uses it directly).
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

// Inline vital chip — minimal, single-line. Mini ring + value.
const VitalChip = ({ icon, label, value, unit, ringValue, color, accent }) => {
  const I = Icons[icon];
  return (
    <div style={{
      flex: 1,
      background: S.glass,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: `1px solid ${S.glassBorder}`,
      borderRadius: 22, padding: '18px 20px',
      display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 10px 24px -18px rgba(31,42,27,0.12)',
    }}>
      <Ring size={46} stroke={5} value={ringValue} color={color} track={accent}>
        <I size={14} stroke={color}/>
      </Ring>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: V.mute, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 400, color: V.ink, letterSpacing: -0.3, lineHeight: 1 }}>{value}</span>
          <span style={{ fontFamily: fonts.sub, fontSize: 12, color: V.mute }}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  // Demo: pretend Maya just typed her breakfast.
  const draft = "Greek yogurt with honey, a handful of walnuts, and a few blueberries";

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      background: `radial-gradient(1100px 600px at 85% -10%, ${S.sageMist} 0%, transparent 60%),
                   radial-gradient(800px 500px at -5% 110%, ${V.clayLight}30 0%, transparent 65%),
                   ${S.pageBg}`,
      fontFamily: fonts.ui, color: V.ink,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 56px',
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

      {/* Centered column */}
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '0 56px 36px' }}>
        <div style={{ width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* Greeting — compact */}
          <div style={{ textAlign: 'center', paddingTop: 10 }}>
            <div style={{ fontSize: 12, color: V.mute, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>
              Tuesday · May 14 · 9:42 am
            </div>
            <h1 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 200,
              fontSize: 34, letterSpacing: -0.8, color: S.sageInk, lineHeight: 1.1,
            }}>
              Good morning, <em style={{ fontStyle: 'italic', color: S.sageDeep, fontWeight: 300 }}>Maya.</em>
            </h1>
          </div>

          {/* HERO — natural language food input */}
          <div style={{
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid ${S.glassBorder}`,
            borderRadius: 28,
            padding: '22px 24px 16px',
            boxShadow: '0 1px 0 rgba(31,42,27,0.03), 0 20px 50px -28px rgba(31,42,27,0.16), 0 50px 100px -60px rgba(61,79,51,0.18)',
          }}>
            {/* Vita pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 10,
                  background: `linear-gradient(135deg, ${S.sageInk}, ${S.sageDeep})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 6px 14px -6px rgba(61,79,51,0.45)',
                }}>
                  <Icons.spark size={14} stroke="#fff"/>
                </div>
                <span style={{ fontSize: 11.5, color: V.inkSoft, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
                  Tell Vita what you ate
                </span>
              </div>
              <span style={{ fontSize: 11.5, color: V.mute }}>No counting. Just describe.</span>
            </div>

            {/* Text area (faux) showing user draft */}
            <div style={{
              minHeight: 64, padding: '6px 4px',
              fontFamily: fonts.sub, fontSize: 20, fontWeight: 400,
              color: V.ink, lineHeight: 1.45, letterSpacing: -0.1,
            }}>
              {draft}
              <span style={{
                display: 'inline-block', width: 2, height: 22, marginLeft: 2,
                background: S.sageDeep, verticalAlign: -4, animation: 'none',
              }}/>
            </div>

            {/* Tools row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, paddingTop: 14, borderTop: `1px solid ${V.lineSoft}` }}>
              {/* Quick chips */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                {[
                  { i: 'plus',  l: 'Photo' },
                  { i: 'mic',   l: 'Speak it' },
                  { i: 'apple', l: 'Past meals' },
                ].map((c, i) => {
                  const I = Icons[c.i];
                  return (
                    <span key={c.l} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 12px', borderRadius: 999,
                      background: V.cardSoft, border: `1px solid ${V.lineSoft}`,
                      fontSize: 12.5, color: V.inkSoft, fontWeight: 500, cursor: 'pointer',
                    }}>
                      <I size={12} stroke={V.inkSoft}/> {c.l}
                    </span>
                  );
                })}
              </div>
              <button style={{
                background: S.sageInk, color: '#fff', border: 'none', borderRadius: 999,
                padding: '10px 20px', fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 8px 18px -8px rgba(61,79,51,0.5)',
              }}>
                Analyze with Vita
                <Icons.arrow size={13} stroke="#fff" sw={2}/>
              </button>
            </div>
          </div>

          {/* AI analysis card — the magic */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: `linear-gradient(135deg, ${S.sageInk} 0%, ${S.sageDeep} 100%)`,
            color: '#fff', borderRadius: 28,
            padding: '22px 26px',
            boxShadow: '0 22px 50px -22px rgba(61,79,51,0.45), 0 6px 16px -8px rgba(61,79,51,0.18)',
          }}>
            {/* ambient */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(420px 220px at 95% -10%, rgba(255,255,255,0.10), transparent 60%),
                           radial-gradient(360px 220px at -5% 110%, ${V.clay}30, transparent 70%)` }}/>

            <div style={{ position: 'relative' }}>
              {/* header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 999, background: '#C9DCB4',
                    boxShadow: '0 0 0 4px rgba(201,220,180,0.25)' }}/>
                  <span style={{ fontSize: 11, opacity: 0.75, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
                    Vita estimated · just now
                  </span>
                </div>
                <span style={{
                  fontSize: 11, padding: '5px 10px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.16)',
                  letterSpacing: 0.4, fontWeight: 500,
                }}>~90% confident</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'center' }}>
                {/* Left — title + breakdown */}
                <div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 300, fontSize: 22, lineHeight: 1.3, letterSpacing: -0.3, marginBottom: 14 }}>
                    Greek yogurt bowl with honey, walnuts & blueberries
                  </div>

                  {/* Macros row */}
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { l: 'Calories', v: '320', u: 'kcal', c: '#F2C19A' },
                      { l: 'Protein',  v: '18',  u: 'g',    c: '#C9DCB4' },
                      { l: 'Carbs',    v: '30',  u: 'g',    c: '#D4D2E8' },
                      { l: 'Fat',      v: '12',  u: 'g',    c: '#E8C8C8' },
                    ].map(m => (
                      <div key={m.l} style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.10)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        borderRadius: 14, padding: '10px 12px',
                      }}>
                        <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600, color: m.c, marginBottom: 4 }}>
                          {m.l}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                          <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 300 }}>{m.v}</span>
                          <span style={{ fontFamily: fonts.sub, fontSize: 11, opacity: 0.65 }}>{m.u}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                    {['High protein', 'Mood-friendly', 'Good before a walk'].map(t => (
                      <span key={t} style={{
                        fontSize: 11.5, padding: '4px 10px', borderRadius: 999,
                        background: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        opacity: 0.9, fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right — note + actions */}
                <div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 200, fontSize: 18,
                    lineHeight: 1.4, letterSpacing: -0.2, marginBottom: 16,
                  }}>
                    Lovely choice — the protein here will hold you nicely
                    <span style={{ opacity: 0.6 }}> until lunch.</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      background: '#fff', color: S.sageInk, border: 'none', borderRadius: 999,
                      padding: '10px 18px', fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}>
                      <Icons.check size={13} stroke={S.sageInk} sw={2.2}/> Looks right
                    </button>
                    <button style={{
                      background: 'transparent', color: 'rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,255,255,0.22)', borderRadius: 999,
                      padding: '10px 16px', fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                      cursor: 'pointer',
                    }}>Adjust</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vitals strip — subtle, supportive */}
          <div style={{ display: 'flex', gap: 14 }}>
            <VitalChip icon="flame" label="Today's calories" value="1,740" unit="of 1,900"
              ringValue={0.91} color={V.clay} accent="#F2E3D6"/>
            <VitalChip icon="drop"  label="Water"            value="5"     unit="of 8"
              ringValue={0.62} color="#8FB0C4" accent="#E5EDF2"/>
            <VitalChip icon="moon"  label="Sleep last night" value="7h 12m" unit="restful"
              ringValue={0.90} color="#9890B0" accent="#ECE7F0"/>
          </div>

        </div>
      </main>
    </div>
  );
};

window.DashboardPage = DashboardPage;
