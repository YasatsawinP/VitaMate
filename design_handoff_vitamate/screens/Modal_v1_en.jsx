// VitaMate — Daily Health Input Modal (shown over a dimmed dashboard)

const Stepper = ({ value, min = 0, color = V.sage500, accent = V.sage50, unit, max }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <button style={{ width: 36, height: 36, borderRadius: 12, background: accent,
      border: 'none', color: color, fontSize: 18, cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center' }}>−</button>
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 400, color: V.ink, lineHeight: 1 }}>
        {value}<span style={{ fontFamily: fonts.sub, fontSize: 14, color: V.mute, marginLeft: 6, fontWeight: 400 }}>{unit}</span>
      </div>
      <div style={{ fontSize: 11, color: V.mute, marginTop: 4 }}>{min} – {max}</div>
    </div>
    <button style={{ width: 36, height: 36, borderRadius: 12, background: color, border: 'none',
      color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
  </div>
);

// Dimmed-dashboard background so the modal context is clear
const DimmedDashboard = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: V.bg,
    overflow: 'hidden',
    filter: 'blur(2px) saturate(0.85)',
    opacity: 0.6,
  }}>
    {/* Faint mock content */}
    <div style={{ padding: 40 }}>
      <div style={{ height: 30, width: 240, background: V.sage50, borderRadius: 8, marginBottom: 24 }}/>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ flex: 1, height: 140, background: V.card, borderRadius: 24, border: `1px solid ${V.line}` }}/>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1.5, height: 260, background: V.card, borderRadius: 24, border: `1px solid ${V.line}` }}/>
        <div style={{ flex: 1, height: 260, background: V.sage700, borderRadius: 24, opacity: 0.4 }}/>
      </div>
    </div>
  </div>
);

const ModalPage = () => {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      fontFamily: fonts.ui, color: V.ink, overflow: 'hidden',
    }}>
      <DimmedDashboard/>
      {/* Scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(31,42,27,0.32)',
        backdropFilter: 'blur(6px)',
      }}/>

      {/* Modal */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 560, maxHeight: '92%',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        border: `1px solid rgba(255,255,255,0.6)`,
        borderRadius: 28,
        boxShadow: '0 40px 80px -20px rgba(31,42,27,0.35), 0 16px 36px -16px rgba(31,42,27,0.18)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: V.mute, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>
              Tuesday · May 14
            </div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: -0.4, color: V.sage900 }}>
              How was today, <span style={{ fontStyle: 'italic', color: V.sage500 }}>so far?</span>
            </h2>
            <p style={{ fontSize: 13, color: V.inkSoft, marginTop: 6, marginBottom: 0, lineHeight: 1.5 }}>
              A quick check-in. No need to be precise — close is plenty.
            </p>
          </div>
          <button style={{
            width: 34, height: 34, borderRadius: 12, background: V.cardSoft, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icons.close size={16} stroke={V.inkSoft}/>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 28px 0' }}>
          {[
            { i: 'flame', l: 'Nutrition', a: true },
            { i: 'drop',  l: 'Hydration' },
            { i: 'moon',  l: 'Sleep' },
            { i: 'sun',   l: 'Mood' },
          ].map(t => {
            const I = Icons[t.i];
            return (
              <div key={t.l} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                background: t.a ? V.sage50 : 'transparent',
                color: t.a ? V.sage700 : V.mute,
                fontSize: 13, fontWeight: t.a ? 500 : 400,
                border: t.a ? `1px solid ${V.sage100}` : `1px solid transparent`,
              }}>
                <I size={14} stroke={t.a ? V.sage600 : V.mute}/> {t.l}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 28px 8px', overflow: 'auto' }}>
          {/* What I ate today */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: fonts.sub, fontWeight: 500, fontSize: 14, color: V.ink, marginBottom: 10 }}>
              What landed on your plate?
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: V.cardSoft, border: `1px solid ${V.line}`, borderRadius: 14, padding: '12px 14px',
            }}>
              <Icons.search size={15} stroke={V.mute}/>
              <span style={{ flex: 1, fontSize: 13.5, color: V.mute }}>Type or say "oat bowl, coffee, half avocado…"</span>
              <button style={{ width: 28, height: 28, borderRadius: 8, background: V.sage50, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icons.mic size={13} stroke={V.sage600}/>
              </button>
            </div>

            {/* Recent chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {['Oat bowl + berries', 'Black coffee', 'Almonds', 'Lentil soup', 'Greek yogurt'].map((c, i) => (
                <span key={c} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: i < 2 ? V.sage50 : V.card, color: i < 2 ? V.sage700 : V.inkSoft,
                  border: i < 2 ? `1px solid ${V.sage100}` : `1px solid ${V.line}`,
                  padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}>
                  {i < 2 && <Icons.check size={10} stroke={V.sage600} sw={2.4}/>} {c}
                </span>
              ))}
            </div>
          </div>

          {/* Quick numbers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div style={{ background: V.cardSoft, border: `1px solid ${V.line}`, borderRadius: 16, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: V.clay }}>
                <Icons.flame size={14} stroke={V.clay}/>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Calories</span>
              </div>
              <Stepper value="1,420" min="0" max="3,000" unit="kcal" color={V.clay} accent="#F5E5DA"/>
            </div>
            <div style={{ background: V.cardSoft, border: `1px solid ${V.line}`, borderRadius: 16, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: V.sage600 }}>
                <Icons.protein size={14} stroke={V.sage600}/>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Protein</span>
              </div>
              <Stepper value="58" min="0" max="200" unit="g" color={V.sage500} accent={V.sage50}/>
            </div>
          </div>

          {/* Mood ribbon */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontFamily: fonts.sub, fontWeight: 500, fontSize: 14, color: V.ink }}>
                How are you feeling?
              </div>
              <span style={{ fontSize: 12, color: V.mute }}>Optional</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { l: 'Heavy',     c: '#B8A488', e: '🫧' },
                { l: 'A bit off', c: V.honey,   e: '🌤' },
                { l: 'Steady',    c: V.sage400, e: '🌱', a: true },
                { l: 'Warm',      c: V.clay,    e: '☀️' },
                { l: 'Glowing',   c: V.sage600, e: '🌿' },
              ].map(m => (
                <div key={m.l} style={{
                  flex: 1, padding: '12px 8px', textAlign: 'center', cursor: 'pointer',
                  background: m.a ? V.sage50 : V.cardSoft,
                  border: `1px solid ${m.a ? V.sage200 : V.line}`,
                  borderRadius: 14,
                }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{m.e}</div>
                  <div style={{ fontSize: 11, color: m.a ? V.sage700 : V.inkSoft, fontWeight: m.a ? 600 : 500 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vita preview */}
          <div style={{
            background: `linear-gradient(135deg, ${V.sage50}, ${V.oat})`,
            border: `1px solid ${V.sage100}`,
            borderRadius: 16, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 999, background: V.sage700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icons.spark size={13} stroke="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: V.sage700, letterSpacing: 0.4, fontWeight: 600, marginBottom: 2 }}>VITA</div>
              <div style={{ fontFamily: fonts.sub, fontSize: 13, fontWeight: 400, color: V.sage900, lineHeight: 1.4 }}>
                Nice — your morning protein is already covered. I'll suggest a
                light dinner around 7pm to protect your sleep tonight.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 28px 20px', borderTop: `1px solid ${V.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <button style={{
            background: 'transparent', border: 'none', color: V.mute,
            fontSize: 13, fontFamily: fonts.ui, cursor: 'pointer',
          }}>Skip today</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              background: V.cardSoft, border: `1px solid ${V.line}`, color: V.inkSoft,
              borderRadius: 999, padding: '10px 18px', fontSize: 13, fontWeight: 500,
              fontFamily: fonts.ui, cursor: 'pointer',
            }}>Save & close</button>
            <button style={{
              background: V.sage600, color: '#fff', border: 'none',
              borderRadius: 999, padding: '10px 22px', fontSize: 13, fontWeight: 500,
              fontFamily: fonts.ui, cursor: 'pointer',
              boxShadow: '0 8px 20px -10px rgba(72,102,60,0.55)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              Save & ask Vita
              <Icons.arrow size={13} stroke="#fff" sw={2}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ModalPage = ModalPage;
