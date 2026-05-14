// VitaMate — Mobile dashboard (iOS)
// Premium wellness app shell. Sage palette, soft shadows, glass cards.

const MobileMetric = ({ icon, label, value, unit, ringValue, color, accent }) => {
  const I = Icons[icon];
  return (
    <div style={{
      background: 'rgba(255,255,255,0.68)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.75)',
      borderRadius: 22, padding: 16,
      boxShadow: '0 1px 0 rgba(31,42,27,0.03), 0 10px 24px -16px rgba(31,42,27,0.14)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ width: 30, height: 30, borderRadius: 10, background: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I size={14} stroke={color}/>
        </div>
        <Ring size={36} stroke={4} value={ringValue} color={color} track={accent}/>
      </div>
      <div style={{ fontSize: 12, color: V.mute, fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 400, color: V.ink, letterSpacing: -0.3, lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: fonts.sub, fontSize: 12, color: V.mute }}>{unit}</span>
      </div>
    </div>
  );
};

const MiniSparkline = ({ data, color = '#A7BB99', width = 320, height = 56 }) => {
  const max = Math.max(...data, 1);
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, height - (v / max) * (height - 14) - 7]);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="mwt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#mwt)"/>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => i === pts.length - 1 && (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="9" fill={color} opacity="0.18"/>
          <circle cx={p[0]} cy={p[1]} r="3.5" fill={color}/>
          <circle cx={p[0]} cy={p[1]} r="1.6" fill="#fff"/>
        </g>
      ))}
    </svg>
  );
};

const TabBar = () => {
  const tabs = [
    { i: 'home',    l: 'Today', a: true },
    { i: 'chart',   l: 'Trends' },
    { i: 'plus',    l: '', primary: true },
    { i: 'chat',    l: 'Vita' },
    { i: 'journal', l: 'Journal' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 32, paddingTop: 8, paddingLeft: 12, paddingRight: 12,
      background: 'linear-gradient(to top, rgba(244,239,227,0.95) 60%, rgba(244,239,227,0.5))',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.75)',
        borderRadius: 999, padding: '8px 12px',
        boxShadow: '0 10px 30px -10px rgba(31,42,27,0.18), 0 4px 12px -8px rgba(31,42,27,0.10)',
      }}>
        {tabs.map((t, i) => {
          const I = Icons[t.i];
          if (t.primary) {
            return (
              <div key={i} style={{
                width: 50, height: 50, borderRadius: 999,
                background: 'linear-gradient(135deg, #6E8961, #3D4F33)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 24px -8px rgba(61,79,51,0.55)',
                marginTop: -22,
              }}>
                <I size={22} stroke="#fff" sw={2.2}/>
              </div>
            );
          }
          return (
            <div key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 0',
              color: t.a ? '#3D4F33' : V.mute,
            }}>
              <I size={20} stroke={t.a ? '#3D4F33' : V.mute} sw={t.a ? 1.8 : 1.6}/>
              <span style={{ fontSize: 10, fontWeight: t.a ? 600 : 500, letterSpacing: 0.2 }}>{t.l}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileDashboard = () => {
  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: `radial-gradient(500px 300px at 90% -10%, #E4ECDB 0%, transparent 60%),
                   radial-gradient(400px 280px at -10% 105%, ${V.clayLight}40 0%, transparent 65%),
                   #F4EFE3`,
      fontFamily: fonts.ui, color: V.ink,
      paddingTop: 54, // status bar
      paddingBottom: 110, // tab bar
    }}>
      {/* Header */}
      <div style={{ padding: '12px 22px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: V.mute, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4, fontWeight: 500 }}>
            Tue · May 14
          </div>
          <div style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 300, letterSpacing: -0.6, color: '#3D4F33', lineHeight: 1.1 }}>
            Good morning,<br/>
            <span style={{ fontStyle: 'italic', color: '#6E8961', fontWeight: 400 }}>Maya</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            width: 40, height: 40, borderRadius: 14,
            background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icons.bell size={16} stroke={V.inkSoft}/>
          </button>
          <div style={{
            width: 40, height: 40, borderRadius: 999,
            background: V.sand, color: V.rust,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: fonts.display, fontSize: 16, fontWeight: 500,
            border: '2px solid rgba(255,255,255,0.8)',
          }}>M</div>
        </div>
      </div>

      {/* AI hero card — top priority */}
      <div style={{ padding: '0 22px' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 26,
          background: 'linear-gradient(135deg, #3D4F33 0%, #6E8961 100%)',
          color: '#fff',
          padding: '22px 22px 20px',
          boxShadow: '0 20px 40px -16px rgba(61,79,51,0.4), 0 6px 16px -8px rgba(61,79,51,0.2)',
        }}>
          {/* organic */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(220px 160px at 100% -10%, rgba(255,255,255,0.12), transparent),
                         radial-gradient(180px 140px at -10% 110%, ${V.clay}40, transparent)` }}/>
          <svg width="120" height="120" style={{ position: 'absolute', right: -20, top: -20, opacity: 0.10 }} viewBox="0 0 120 120" fill="none">
            <path d="M110 10C60 10 25 38 25 80c0 8 2 15 6 21" stroke="#fff" strokeWidth="1.2"/>
            <path d="M110 10c0 55-32 90-72 90-7 0-13-1-19-4" stroke="#fff" strokeWidth="1.2"/>
            <path d="M30 110l50-50" stroke="#fff" strokeWidth="1.2"/>
          </svg>

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 10,
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.18)' }}>
                <Icons.spark size={14} stroke="#fff"/>
              </div>
              <span style={{ fontSize: 10, opacity: 0.7, letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600 }}>
                Vita · today's gentle nudge
              </span>
            </div>

            <div style={{
              fontFamily: fonts.display, fontWeight: 300, fontSize: 21, lineHeight: 1.3,
              letterSpacing: -0.3, marginBottom: 16,
            }}>
              You slept beautifully — let's protect it.{' '}
              <span style={{ opacity: 0.6 }}>A bit more protein at lunch will carry you through 3pm.</span>
            </div>

            {/* Nudge chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[
                { i: 'bowl', t: 'Add 20g protein at lunch', s: 'Greek yogurt or lentil bowl' },
                { i: 'walk', t: '15-min walk after work',   s: 'Helps sleep before 11' },
              ].map(n => {
                const I = Icons[n.i];
                return (
                  <div key={n.t} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 14, padding: '10px 12px',
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: 9, background: 'rgba(255,255,255,0.14)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <I size={14} stroke="#fff"/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, fontFamily: fonts.sub, marginBottom: 1 }}>{n.t}</div>
                      <div style={{ fontSize: 11, opacity: 0.65 }}>{n.s}</div>
                    </div>
                    <Icons.arrow size={13} stroke="#fff"/>
                  </div>
                );
              })}
            </div>

            <button style={{
              width: '100%',
              background: 'rgba(255,255,255,0.95)', color: '#3D4F33',
              border: 'none', borderRadius: 14, padding: '12px',
              fontSize: 13, fontWeight: 500, fontFamily: fonts.ui, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              Talk with Vita
              <Icons.arrow size={13} stroke="#3D4F33" sw={2}/>
            </button>
          </div>
        </div>
      </div>

      {/* Today's rings — section */}
      <div style={{ padding: '24px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontFamily: fonts.sub, fontWeight: 500, fontSize: 16, color: V.ink, letterSpacing: -0.1 }}>
            Today, gently
          </h2>
          <span style={{ fontSize: 12, color: '#6E8961', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            74% <Icons.arrow size={12} stroke="#6E8961"/>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <MobileMetric icon="flame"   label="Calories" value="1,420" unit="kcal"
            ringValue={0.74} color={V.clay}    accent="#F2E3D6"/>
          <MobileMetric icon="protein" label="Protein"  value="58"    unit="g"
            ringValue={0.64} color="#6E8961"   accent="#E4ECDB"/>
          <MobileMetric icon="drop"    label="Water"    value="5"     unit="glasses"
            ringValue={0.62} color="#8FB0C4"   accent="#E5EDF2"/>
          <MobileMetric icon="moon"    label="Sleep"    value="7h 12m" unit=""
            ringValue={0.90} color="#9890B0"   accent="#ECE7F0"/>
        </div>
      </div>

      {/* Balance & trend */}
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{
          background: 'rgba(255,255,255,0.68)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.75)',
          borderRadius: 24, padding: 20,
          boxShadow: '0 1px 0 rgba(31,42,27,0.03), 0 12px 28px -16px rgba(31,42,27,0.14)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: V.mute, fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                This week's rhythm
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                <span style={{ fontFamily: fonts.display, fontSize: 38, fontWeight: 300, color: '#3D4F33', letterSpacing: -0.8, lineHeight: 1 }}>82</span>
                <span style={{ fontFamily: fonts.sub, fontSize: 13, color: V.mute }}>balance</span>
              </div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4,
              background: '#E4ECDB', color: '#6E8961',
              padding: '5px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
            }}>
              <Icons.arrowUp size={10} sw={2.2} stroke="#6E8961"/> +7
            </span>
          </div>

          <div style={{ marginLeft: -4, marginRight: -4, marginTop: 4 }}>
            <MiniSparkline data={[60, 64, 58, 72, 70, 78, 82]} color="#A7BB99" width={320} height={56}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: V.mute, marginTop: 4, padding: '0 4px' }}>
              {['W', 'T', 'F', 'S', 'S', 'M', 'T'].map((d, i) => (
                <span key={i} style={{ fontWeight: i === 6 ? 700 : 400, color: i === 6 ? '#6E8961' : V.mute }}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pattern insight */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.75)',
          borderRadius: 22, padding: 18,
          boxShadow: '0 1px 0 rgba(31,42,27,0.03), 0 10px 24px -16px rgba(31,42,27,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6E8961', marginBottom: 8 }}>
            <Icons.trend size={13} stroke="#6E8961"/>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Pattern noticed</span>
          </div>
          <div style={{ fontFamily: fonts.display, fontWeight: 300, fontSize: 17, lineHeight: 1.35, color: '#3D4F33', letterSpacing: -0.2 }}>
            You sleep <em style={{ fontStyle: 'italic', color: '#6E8961', fontWeight: 400 }}>42 min longer</em> on days you walk before 6pm.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
            <button style={{
              background: '#E4ECDB', color: '#3D4F33', border: 'none', borderRadius: 999,
              padding: '7px 14px', fontSize: 12, fontWeight: 500, fontFamily: fonts.ui, cursor: 'pointer',
            }}>Remind me at 5pm</button>
            <button style={{
              background: 'transparent', color: V.mute, border: 'none', borderRadius: 999,
              padding: '7px 4px', fontSize: 12, fontWeight: 500, fontFamily: fonts.ui, cursor: 'pointer',
            }}>Not now</button>
          </div>
        </div>
      </div>

      <TabBar/>
    </div>
  );
};

window.MobileDashboard = MobileDashboard;
