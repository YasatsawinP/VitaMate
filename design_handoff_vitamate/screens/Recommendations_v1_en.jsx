// VitaMate — AI Recommendations / Chat companion

const Message = ({ from, children, time }) => {
  const isUser = from === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 16, gap: 10 }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: 999,
          background: V.sage700, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 10px -3px rgba(72,102,60,0.4)',
        }}>
          <Icons.spark size={14} stroke="#fff"/>
        </div>
      )}
      <div style={{ maxWidth: 460 }}>
        {!isUser && (
          <div style={{ fontSize: 11, color: V.mute, marginBottom: 4, fontWeight: 500, letterSpacing: 0.3 }}>
            VITA · {time}
          </div>
        )}
        <div style={{
          background: isUser ? V.sage600 : V.card,
          color: isUser ? '#fff' : V.ink,
          fontFamily: fonts.sub, fontWeight: isUser ? 400 : 300, fontSize: 15, lineHeight: 1.55,
          padding: '14px 18px',
          borderRadius: isUser ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
          border: isUser ? 'none' : `1px solid ${V.line}`,
          boxShadow: isUser ? '0 8px 20px -10px rgba(72,102,60,0.4)'
                            : '0 1px 0 rgba(31,42,27,0.02), 0 6px 14px -8px rgba(31,42,27,0.08)',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const RecommendationsPage = () => {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: V.bg, fontFamily: fonts.ui, color: V.ink }}>
      <Sidebar active="ai"/>

      {/* Center: conversation */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 36px', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 18,
              background: `linear-gradient(135deg, ${V.sage500}, ${V.sage700})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 24px -10px rgba(72,102,60,0.5)',
            }}>
              <Icons.spark size={22} stroke="#fff"/>
            </div>
            <div>
              <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 400, letterSpacing: -0.3 }}>
                Vita
              </div>
              <div style={{ fontSize: 12, color: V.mute, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: V.sage500 }}/>
                Listening · adjusts to how you feel
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Pill color={V.oat} fg={V.rust}>This week's mood: steady</Pill>
            <Pill>Plan: gentle reset</Pill>
          </div>
        </div>

        {/* Conversation thread */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px 0 8px', marginTop: 12 }}>
          <div style={{
            textAlign: 'center', fontSize: 11, color: V.mute, marginBottom: 18,
            letterSpacing: 0.4, textTransform: 'uppercase',
          }}>Today · 8:14 am</div>

          <Message from="vita" time="8:14 AM">
            Good morning, Maya. You slept 7h 12m — your deepest stretch was right before 5am.
            How does your body feel right now?
          </Message>

          {/* Quick chip replies */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginLeft: 42, marginBottom: 18 }}>
            {['Calm', 'A bit tired', 'Energized', 'Sore', 'Anxious'].map((c, i) => (
              <Pill key={c} color={i === 1 ? V.sage100 : V.card} fg={i === 1 ? V.sage700 : V.inkSoft}
                style={{ padding: '8px 14px', fontSize: 13, fontWeight: i === 1 ? 500 : 400, border: `1px solid ${V.line}`, cursor: 'pointer' }}>
                {c}
              </Pill>
            ))}
          </div>

          <Message from="user">A little tired — yesterday was a lot.</Message>

          <Message from="vita" time="8:15 AM">
            That makes sense. I'm going to ease today's targets a touch — no
            need to chase numbers. Here's what I'd suggest, and you can pick
            what feels right:
          </Message>

          {/* Recommendation cards */}
          <div style={{ marginLeft: 42, marginBottom: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: 'bowl',   tag: 'Breakfast',  color: V.clay,    title: 'Oats + almond butter + berries',
                sub: '~380 kcal · 14g protein · slow-burn', accent: '#F5E5DA' },
              { icon: 'drop',   tag: 'Hydration',  color: '#7AA6C2', title: 'Warm lemon water now',
                sub: 'You usually skip morning water on tired days', accent: '#E2EDF3' },
              { icon: 'walk',   tag: 'Movement',   color: V.sage500, title: '12-min walk at 11am',
                sub: 'Soft sunlight helps reset your circadian dip', accent: V.sage50 },
              { icon: 'moon',   tag: 'Wind-down',  color: '#8A7BA8', title: 'Lights down by 10:15pm',
                sub: 'You fall asleep 18 min faster after that', accent: '#ECE5F1' },
            ].map(r => {
              const I = Icons[r.icon];
              return (
                <div key={r.title} style={{
                  background: V.card, borderRadius: 16, padding: 16,
                  border: `1px solid ${V.line}`,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  boxShadow: '0 4px 14px -10px rgba(31,42,27,0.08)',
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: r.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <I size={18} stroke={r.color}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Pill color="transparent" fg={r.color} style={{ padding: 0, marginBottom: 4, fontSize: 10, letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600 }}>{r.tag}</Pill>
                    <div style={{ fontFamily: fonts.sub, fontWeight: 500, fontSize: 14.5, color: V.ink, marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: V.mute, lineHeight: 1.4 }}>{r.sub}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <button style={{ background: V.sage50, color: V.sage700, border: 'none',
                        borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.ui }}>
                        Add to today
                      </button>
                      <button style={{ background: 'transparent', color: V.mute, border: 'none',
                        borderRadius: 999, padding: '5px 8px', fontSize: 12, cursor: 'pointer', fontFamily: fonts.ui }}>
                        Not now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Message from="vita" time="8:16 AM">
            And a small note — you've been hitting protein 5 of 7 days. That's
            real progress. There's no "perfect" here, just patterns we can
            tend to. 🌱
          </Message>
        </div>

        {/* Composer */}
        <div style={{
          background: V.card, border: `1px solid ${V.line}`,
          borderRadius: 20, padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 8px 24px -12px rgba(31,42,27,0.12)',
        }}>
          <button style={{ background: V.sage50, border: 'none', width: 36, height: 36, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icons.plus size={16} stroke={V.sage600} sw={2}/>
          </button>
          <input
            placeholder="Tell Vita what's on your plate — or how you feel…"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: fonts.ui,
              background: 'transparent', color: V.ink, padding: '8px 4px' }}
          />
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8 }}>
            <Icons.mic size={16} stroke={V.mute}/>
          </button>
          <button style={{ background: V.sage600, border: 'none', width: 36, height: 36, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icons.send size={15} stroke="#fff" sw={2}/>
          </button>
        </div>
      </main>

      {/* Right rail: insights */}
      <aside style={{ width: 300, padding: '28px 28px 28px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 12, color: V.mute, fontWeight: 500, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Holistic insights
        </div>

        <Card padding={18}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: V.sage600 }}>
            <Icons.trend size={15} stroke={V.sage600}/>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Pattern noticed</span>
          </div>
          <div style={{ fontFamily: fonts.sub, fontSize: 15, fontWeight: 500, lineHeight: 1.4, color: V.ink }}>
            You sleep 42 min longer on days you eat before 8pm.
          </div>
          <div style={{ fontSize: 12, color: V.mute, marginTop: 8, lineHeight: 1.5 }}>
            Based on the last 21 days. Want me to suggest earlier dinners on weeknights?
          </div>
        </Card>

        <Card padding={18} style={{ background: V.oat, border: `1px solid ${V.sand}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: V.rust }}>
            <Icons.sun size={15} stroke={V.rust}/>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Today's focus</span>
          </div>
          <div style={{ fontFamily: fonts.sub, fontSize: 15, fontWeight: 500, lineHeight: 1.4, color: V.sage900 }}>
            Steady morning, light afternoon
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <div style={{ flex: 1, height: 6, background: 'rgba(168,100,66,0.15)', borderRadius: 999 }}>
              <div style={{ width: '40%', height: '100%', background: V.rust, borderRadius: 999 }}/>
            </div>
            <span style={{ fontSize: 11, color: V.rust, fontWeight: 500 }}>2 of 5</span>
          </div>
        </Card>

        <Card padding={18}>
          <div style={{ fontSize: 11, color: V.mute, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 10 }}>
            Connected
          </div>
          {[
            { l: 'Apple Health', s: 'Sleep · Steps · HR', on: true },
            { l: 'Oura Ring',    s: 'Readiness · HRV',   on: true },
            { l: 'MyFitnessPal', s: 'Meals',             on: false },
          ].map(c => (
            <div key={c.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: `1px solid ${V.lineSoft}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: V.sage50,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.apple size={14} stroke={V.sage600}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: V.ink, fontWeight: 500 }}>{c.l}</div>
                <div style={{ fontSize: 11, color: V.mute }}>{c.s}</div>
              </div>
              <div style={{
                width: 28, height: 16, borderRadius: 999,
                background: c.on ? V.sage500 : V.sage50,
                position: 'relative', flexShrink: 0,
              }}>
                <div style={{ position: 'absolute', top: 2, left: c.on ? 14 : 2,
                  width: 12, height: 12, borderRadius: 999, background: '#fff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)', transition: 'left 0.2s' }}/>
              </div>
            </div>
          ))}
        </Card>
      </aside>
    </div>
  );
};

window.RecommendationsPage = RecommendationsPage;
