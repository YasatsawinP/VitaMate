// VitaMate — Landing page

const LandingPage = () => {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `radial-gradient(1200px 600px at 80% -10%, ${V.sage100} 0%, transparent 60%),
                   radial-gradient(800px 500px at -10% 90%, ${V.clayLight}40 0%, transparent 60%),
                   ${V.bg}`,
      fontFamily: fonts.ui, color: V.ink, overflow: 'hidden', position: 'relative',
    }}>
      {/* Top nav */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={30} />
          <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, letterSpacing: -0.2 }}>VitaMate</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 14, color: V.inkSoft }}>
          <a style={{ cursor: 'pointer' }}>How it works</a>
          <a style={{ cursor: 'pointer' }}>Science</a>
          <a style={{ cursor: 'pointer' }}>Stories</a>
          <a style={{ cursor: 'pointer' }}>Pricing</a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{
            background: 'transparent', border: 'none', color: V.inkSoft,
            fontSize: 14, fontFamily: fonts.ui, cursor: 'pointer',
          }}>Sign in</button>
          <button style={{
            background: V.sage600, color: '#fff', border: 'none',
            padding: '10px 18px', borderRadius: 999, fontSize: 14, fontWeight: 500,
            fontFamily: fonts.ui, cursor: 'pointer',
            boxShadow: '0 8px 20px -8px rgba(72,102,60,0.5)',
          }}>Start free</button>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56,
        padding: '60px 64px 0', alignItems: 'center',
      }}>
        <div>
          <Pill style={{ marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: V.sage500 }}/>
            New · AI guidance that bends to your week
          </Pill>
          <h1 style={{
            fontFamily: fonts.display, fontWeight: 300,
            fontSize: 76, lineHeight: 1.02, letterSpacing: -2,
            margin: 0, color: V.sage900,
          }}>
            A gentler way<br/>
            to know <em style={{ fontFamily: fonts.display, fontStyle: 'italic', color: V.sage500, fontWeight: 400 }}>your body.</em>
          </h1>
          <p style={{
            fontSize: 18, lineHeight: 1.55, color: V.inkSoft, maxWidth: 480,
            marginTop: 24, marginBottom: 36,
          }}>
            VitaMate quietly tracks calories, protein, hydration and sleep — then
            offers small, kind nudges instead of guilt. No streaks. No shame.
            Just a calmer relationship with how you feel.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button style={{
              background: V.sage600, color: '#fff', border: 'none',
              padding: '16px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500,
              fontFamily: fonts.ui, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: '0 12px 28px -10px rgba(72,102,60,0.55)',
            }}>
              Begin your 14-day check-in
              <Icons.arrow size={16} stroke="#fff" sw={2}/>
            </button>
            <button style={{
              background: 'transparent', border: `1px solid ${V.line}`,
              padding: '15px 22px', borderRadius: 999, fontSize: 15,
              fontFamily: fonts.ui, cursor: 'pointer', color: V.inkSoft,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <Icons.play size={14} fill={V.inkSoft} stroke="none"/>
              Watch a one-minute tour
            </button>
          </div>

          {/* Trust strip */}
          <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 28, color: V.mute, fontSize: 13 }}>
            <span>As featured in</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: V.inkSoft, fontStyle: 'italic' }}>The Atlantic</span>
            <span style={{ fontFamily: fonts.display, fontSize: 16, color: V.inkSoft, letterSpacing: 1 }}>WIRED</span>
            <span style={{ fontFamily: fonts.sub, fontSize: 15, color: V.inkSoft, fontWeight: 600 }}>Outside</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: V.inkSoft }}>Well+Good</span>
          </div>
        </div>

        {/* Hero visual — floating dashboard preview */}
        <div style={{ position: 'relative', height: 560 }}>
          {/* Soft halo */}
          <div style={{
            position: 'absolute', inset: '5% 8% 5% 8%',
            background: `radial-gradient(circle at 50% 40%, ${V.sage100}, transparent 70%)`,
            filter: 'blur(20px)', borderRadius: '50%',
          }}/>

          {/* Main dashboard mini */}
          <div style={{
            position: 'absolute', right: 0, top: 40, width: 380,
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
            borderRadius: 24, padding: 22, border: `1px solid ${V.line}`,
            boxShadow: '0 30px 60px -20px rgba(31,42,27,0.18), 0 12px 28px -16px rgba(31,42,27,0.12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, color: V.mute, letterSpacing: 0.5, textTransform: 'uppercase' }}>Tuesday</div>
                <div style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 400, marginTop: 2 }}>Good morning, Maya</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: V.sand,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.display, color: V.rust }}>M</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <Ring size={150} stroke={11} value={0.68} color={V.sage500} track={V.sage50}>
                <div style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 400, color: V.sage700 }}>68%</div>
                <div style={{ fontSize: 11, color: V.mute, marginTop: 2 }}>of today, gently</div>
              </Ring>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { icon: 'flame', label: 'Calories', val: '1,420', sub: 'of ~1,900', color: V.clay },
                { icon: 'protein', label: 'Protein', val: '58g', sub: 'of 90g', color: V.sage500 },
                { icon: 'drop', label: 'Water', val: '5', sub: 'of 8 glasses', color: '#7AA6C2' },
                { icon: 'moon', label: 'Sleep', val: '7h 12m', sub: 'restful', color: '#8A7BA8' },
              ].map(m => {
                const I = Icons[m.icon];
                return (
                  <div key={m.label} style={{ background: V.cardSoft, borderRadius: 14, padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: m.color, marginBottom: 4 }}>
                      <I size={13} stroke={m.color}/>
                      <span style={{ fontSize: 11, color: V.mute, fontWeight: 500 }}>{m.label}</span>
                    </div>
                    <div style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 400, color: V.ink }}>{m.val}</div>
                    <div style={{ fontSize: 10, color: V.mute }}>{m.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI chat bubble */}
          <div style={{
            position: 'absolute', left: 0, top: 360, width: 280,
            background: V.sage600, color: '#fff',
            borderRadius: '24px 24px 24px 6px', padding: '16px 18px',
            boxShadow: '0 24px 50px -20px rgba(72,102,60,0.45)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: 0.85 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: V.sage400,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.spark size={12} stroke="#fff" sw={2}/>
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 0.3 }}>VITA · YOUR COMPANION</span>
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5, fontFamily: fonts.sub, fontWeight: 300 }}>
              Yesterday was a long one — let's keep today soft. A walk after lunch
              and an extra glass of water would land nicely.
            </div>
          </div>

          {/* Floating insight card */}
          <div style={{
            position: 'absolute', right: 30, bottom: 0, width: 220,
            background: V.card, borderRadius: 18, padding: '14px 16px',
            border: `1px solid ${V.line}`,
            boxShadow: '0 20px 40px -16px rgba(31,42,27,0.14)',
          }}>
            <div style={{ fontSize: 11, color: V.mute, marginBottom: 4 }}>Weekly insight</div>
            <div style={{ fontFamily: fonts.sub, fontSize: 14, fontWeight: 500, color: V.ink, lineHeight: 1.4 }}>
              You sleep 42 min longer on days you walk before 6pm.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: V.sage600, fontSize: 12 }}>
              <Icons.trend size={14}/> <span>+18% restful</span>
            </div>
          </div>

          {/* tiny decorative leaf */}
          <svg width="80" height="80" style={{ position: 'absolute', left: 240, top: 0, opacity: 0.5 }} viewBox="0 0 80 80" fill="none">
            <path d="M70 10c-30 0-50 18-50 40 0 4 1 8 3 11" stroke={V.sage400} strokeWidth="1.2"/>
            <path d="M70 10c0 28-14 45-38 45-4 0-8-1-11-3" stroke={V.sage400} strokeWidth="1.2"/>
          </svg>
        </div>
      </section>

      {/* Bottom features strip */}
      <section style={{ padding: '80px 64px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { i: 'flame',   t: 'Mindful nutrition', d: 'Calories & protein, framed as care — not calorie math.', c: V.clay },
          { i: 'drop',    t: 'Quiet hydration',   d: 'Soft reminders that learn your day, not interrupt it.',  c: '#7AA6C2' },
          { i: 'moon',    t: 'Sleep, understood', d: 'Patterns from your phone or wearable, kindly explained.', c: '#8A7BA8' },
          { i: 'spark',   t: 'AI that listens',   d: 'A companion that adjusts when life adjusts.',              c: V.sage500 },
        ].map((f, i) => {
          const I = Icons[f.i];
          return (
            <div key={i} style={{ padding: '4px 4px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: V.sage50,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <I size={20} stroke={f.c}/>
              </div>
              <div style={{ fontFamily: fonts.sub, fontSize: 16, fontWeight: 500, color: V.ink, marginBottom: 6 }}>{f.t}</div>
              <div style={{ fontSize: 13.5, color: V.inkSoft, lineHeight: 1.5 }}>{f.d}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

window.LandingPage = LandingPage;
