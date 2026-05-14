// VitaMate — Main dashboard

const Sidebar = ({ active = 'home' }) => {
  const nav = [
    { id: 'home', icon: 'home', label: 'Today' },
    { id: 'trends', icon: 'chart', label: 'Trends' },
    { id: 'ai', icon: 'chat', label: 'Vita' },
    { id: 'journal', icon: 'journal', label: 'Journal' },
    { id: 'settings', icon: 'gear', label: 'Settings' },
  ];
  return (
    <aside style={{
      width: 220, padding: '28px 18px',
      background: V.bg,
      borderRight: `1px solid ${V.line}`,
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 28px' }}>
        <Logo size={28}/>
        <span style={{ fontFamily: fonts.display, fontSize: 20, letterSpacing: -0.2 }}>VitaMate</span>
      </div>

      {nav.map(n => {
        const I = Icons[n.icon];
        const a = active === n.id;
        return (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 12,
            background: a ? V.sage50 : 'transparent',
            color: a ? V.sage700 : V.inkSoft,
            fontSize: 14, fontWeight: a ? 500 : 400, cursor: 'pointer',
          }}>
            <I size={18} stroke={a ? V.sage600 : V.mute}/>
            <span>{n.label}</span>
          </div>
        );
      })}

      <div style={{ flex: 1 }}/>

      <div style={{
        background: V.sage700, color: '#fff', borderRadius: 16, padding: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, opacity: 0.85 }}>
          <Icons.spark size={14} stroke="#fff"/>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 0.3 }}>VITA</span>
        </div>
        <div style={{ fontFamily: fonts.sub, fontWeight: 300, fontSize: 13, lineHeight: 1.4, marginBottom: 10 }}>
          You have 2 small things to check on today.
        </div>
        <button style={{
          background: V.sage400, color: '#fff', border: 'none', borderRadius: 999,
          padding: '7px 14px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
          fontFamily: fonts.ui,
        }}>Open Vita →</button>
      </div>
    </aside>
  );
};

// Tiny weekly trend chart for the focus card
const WeekTrend = ({ data, color = V.sage500, width = 480, height = 100 }) => {
  const max = Math.max(...data, 1);
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, height - (v / max) * (height - 14) - 7]);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  // Smooth area below
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="wt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#wt)"/>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => i === pts.length - 1 && (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="9" fill={color} opacity="0.18"/>
          <circle cx={p[0]} cy={p[1]} r="4" fill={color}/>
          <circle cx={p[0]} cy={p[1]} r="2" fill="#fff"/>
        </g>
      ))}
    </svg>
  );
};

const MetricCard = ({ icon, label, value, unit, sub, of, ringValue, color, accent }) => {
  const I = Icons[icon];
  return (
    <Card padding={22}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <I size={16} stroke={color}/>
            </div>
            <span style={{ fontSize: 13, color: V.inkSoft, fontWeight: 500 }}>{label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 38, lineHeight: 1, color: V.ink }}>{value}</span>
            <span style={{ fontFamily: fonts.sub, fontSize: 14, color: V.mute, fontWeight: 400 }}>{unit}</span>
          </div>
          <div style={{ fontSize: 12, color: V.mute, marginTop: 6 }}>{sub}</div>
        </div>
        <Ring size={68} stroke={7} value={ringValue} color={color} track={accent}>
          <span style={{ fontSize: 11, fontFamily: fonts.sub, fontWeight: 500, color: color }}>{Math.round(ringValue*100)}%</span>
        </Ring>
      </div>
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${V.lineSoft}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: V.mute }}>
        <span>{of}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: V.sage600 }}>
          <Icons.arrowUp size={11} sw={2} stroke={V.sage600}/> on track
        </span>
      </div>
    </Card>
  );
};

const DashboardPage = () => {
  return (
    <div style={{
      display: 'flex', width: '100%', height: '100%',
      background: V.bg, fontFamily: fonts.ui, color: V.ink,
    }}>
      <Sidebar active="home"/>

      {/* Main */}
      <main style={{ flex: 1, padding: '28px 36px 40px', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 12, color: V.mute, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>
              Tuesday · May 14
            </div>
            <h1 style={{ fontFamily: fonts.display, fontWeight: 300, fontSize: 34, margin: 0, letterSpacing: -0.6, color: V.sage900 }}>
              Good morning, <span style={{ fontStyle: 'italic', color: V.sage500 }}>Maya</span>
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: V.card, padding: '8px 14px', borderRadius: 999,
              border: `1px solid ${V.line}`, fontSize: 13, color: V.inkSoft,
            }}>
              <Icons.search size={14} stroke={V.mute}/>
              <span style={{ color: V.mute }}>Log a meal, drink, mood…</span>
            </div>
            <button style={{
              background: V.card, border: `1px solid ${V.line}`, borderRadius: 999,
              width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icons.bell size={16} stroke={V.inkSoft}/>
            </button>
            <button style={{
              background: V.sage600, color: '#fff', border: 'none', borderRadius: 999,
              padding: '10px 16px', display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 500, fontFamily: fonts.ui, cursor: 'pointer',
              boxShadow: '0 6px 16px -8px rgba(72,102,60,0.5)',
            }}>
              <Icons.plus size={14} stroke="#fff" sw={2.2}/> Log today
            </button>
          </div>
        </div>

        {/* Layout: 4 metric cards + focus card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
          <MetricCard icon="flame"   label="Calories" value="1,420" unit="kcal" sub="~480 to go, no rush"
            of="of 1,900 gentle target" ringValue={0.74} color={V.clay}   accent="#F5E5DA"/>
          <MetricCard icon="protein" label="Protein"  value="58"    unit="g"    sub="lunch is your big one"
            of="of 90g daily anchor"    ringValue={0.64} color={V.sage500} accent={V.sage50}/>
          <MetricCard icon="drop"    label="Water"    value="5"     unit="glasses" sub="3 more before sunset"
            of="of 8 small sips"        ringValue={0.62} color="#7AA6C2" accent="#E2EDF3"/>
          <MetricCard icon="moon"    label="Sleep"    value="7h 12m" unit="" sub="deep cycle was kind"
            of="of 8h restful window"   ringValue={0.90} color="#8A7BA8" accent="#ECE5F1"/>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16 }}>
          {/* Trend card */}
          <Card padding={26}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 12, color: V.mute, fontWeight: 500, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>
                  This week's rhythm
                </div>
                <div style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 400, color: V.ink, letterSpacing: -0.3 }}>
                  Your balance score is <span style={{ color: V.sage500 }}>82</span>
                </div>
                <div style={{ fontSize: 13, color: V.inkSoft, marginTop: 4 }}>
                  Up 7 points from last week — mostly thanks to steadier sleep.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, background: V.sage50, padding: 4, borderRadius: 999 }}>
                {['Week', 'Month', 'Year'].map((t, i) => (
                  <span key={t} style={{
                    padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                    background: i === 0 ? V.card : 'transparent',
                    color: i === 0 ? V.sage700 : V.mute,
                    boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 18, marginLeft: -6 }}>
              <WeekTrend data={[60, 64, 58, 72, 70, 78, 82]} color={V.sage500} width={540} height={110}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: V.mute, marginTop: 4, padding: '0 4px' }}>
                {['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'].map((d, i) => (
                  <span key={d} style={{ fontWeight: i === 6 ? 600 : 400, color: i === 6 ? V.sage700 : V.mute }}>{d}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 22 }}>
              {[
                { l: 'Avg sleep',    v: '7h 24m', d: '+34m', col: V.sage600 },
                { l: 'Hydration',    v: '6.4 / 8', d: 'steady', col: V.sage600 },
                { l: 'Protein hits', v: '5 of 7',  d: '+1 vs last', col: V.sage600 },
              ].map(s => (
                <div key={s.l} style={{ background: V.cardSoft, borderRadius: 14, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, color: V.mute, marginBottom: 4 }}>{s.l}</div>
                  <div style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 400, color: V.ink }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: s.col, marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Icons.arrowUp size={10} sw={2} stroke={s.col}/> {s.d}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI nudge column */}
          <Card padding={0} style={{ background: V.sage700, color: '#fff', overflow: 'hidden', position: 'relative' }}>
            {/* soft mesh */}
            <div style={{ position: 'absolute', inset: 0,
              background: `radial-gradient(400px 200px at 80% -20%, ${V.sage400}55, transparent),
                           radial-gradient(300px 200px at 0% 110%, ${V.clay}33, transparent)`,
            }}/>
            <div style={{ position: 'relative', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
                  <Icons.spark size={16} stroke="#fff"/>
                </div>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 0.4 }}>VITA · YOUR COMPANION</div>
                  <div style={{ fontFamily: fonts.sub, fontWeight: 500, fontSize: 15 }}>Today's gentle nudges</div>
                </div>
              </div>

              <div style={{ fontFamily: fonts.sub, fontWeight: 300, fontSize: 18, lineHeight: 1.45, marginBottom: 18 }}>
                "You slept beautifully — let's protect that streak.
                A bit more protein at lunch could carry you through 3pm."
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { i: 'bowl', t: 'Add 20g protein at lunch', s: 'Greek yogurt or lentil bowl' },
                  { i: 'drop', t: 'Two glasses by noon',      s: 'You usually under-drink on Tuesdays' },
                  { i: 'walk', t: 'A 15-min walk after work', s: 'Helps you fall asleep before 11' },
                ].map(n => {
                  const I = Icons[n.i];
                  return (
                    <div key={n.t} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 14, padding: '10px 14px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <I size={14} stroke="#fff"/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 1 }}>{n.t}</div>
                        <div style={{ fontSize: 11, opacity: 0.65 }}>{n.s}</div>
                      </div>
                      <Icons.arrow size={14} stroke="#fff"/>
                    </div>
                  );
                })}
              </div>

              <button style={{
                marginTop: 18, width: '100%',
                background: 'rgba(255,255,255,0.95)', color: V.sage700,
                border: 'none', borderRadius: 999, padding: '11px',
                fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                Talk with Vita
                <Icons.arrow size={14} stroke={V.sage700} sw={2}/>
              </button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

window.DashboardPage = DashboardPage;
