// VitaMate — กล่องป้อนข้อมูลประจำวัน (Thai-first, conversational)

const DimmedDashboard = () => (
  <div style={{
    position: 'absolute', inset: 0,
    background: V.bg,
    overflow: 'hidden',
    filter: 'blur(2px) saturate(0.85)',
    opacity: 0.6,
  }}>
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
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(31,42,27,0.32)',
        backdropFilter: 'blur(6px)',
      }}/>

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
        <div style={{ padding: '24px 28px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11.5, color: V.mute, marginBottom: 4 }}>
              อังคารที่ 14 พฤษภาคม
            </div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: -0.3, color: V.sage900 }}>
              วันนี้เป็นยังไงบ้าง <em style={{ fontStyle: 'italic', color: V.sage500 }}>คุณมายา?</em>
            </h2>
            <p style={{ fontSize: 13, color: V.inkSoft, marginTop: 6, marginBottom: 0, lineHeight: 1.6, fontWeight: 300 }}>
              เช็กอินสั้น ๆ ไม่ต้องตรงเป๊ะ — แค่ใกล้เคียงก็พอค่ะ
            </p>
          </div>
          <button style={{
            width: 34, height: 34, borderRadius: 12, background: V.cardSoft, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icons.close size={16} stroke={V.inkSoft}/>
          </button>
        </div>

        {/* แท็บ */}
        <div style={{ display: 'flex', gap: 6, padding: '10px 28px 0' }}>
          {[
            { i: 'flame', l: 'อาหาร', a: true },
            { i: 'drop',  l: 'น้ำดื่ม' },
            { i: 'moon',  l: 'การนอน' },
            { i: 'sun',   l: 'อารมณ์' },
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

        <div style={{ padding: '18px 28px 8px', overflow: 'auto' }}>
          {/* เล่ามื้ออาหาร */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: fonts.sub, fontWeight: 500, fontSize: 14, color: V.ink, marginBottom: 10 }}>
              วันนี้ทานอะไรไปบ้าง?
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: V.cardSoft, border: `1px solid ${V.line}`, borderRadius: 14, padding: '12px 14px',
            }}>
              <Icons.search size={15} stroke={V.mute}/>
              <span style={{ flex: 1, fontSize: 13.5, color: V.mute, fontWeight: 300 }}>พิมพ์หรือพูดบอก เช่น "โจ๊กไก่ กาแฟดำ ส้มลูกหนึ่ง…"</span>
              <button style={{ width: 28, height: 28, borderRadius: 8, background: V.sage50, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icons.mic size={13} stroke={V.sage600}/>
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {[
                { l: 'โยเกิร์ตกรีก + เบอร์รี', a: true },
                { l: 'กาแฟดำ', a: true },
                { l: 'อัลมอนด์' },
                { l: 'ข้าวต้มหมู' },
                { l: 'นมถั่วเหลือง' },
              ].map((c, i) => (
                <span key={c.l} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: c.a ? V.sage50 : V.card, color: c.a ? V.sage700 : V.inkSoft,
                  border: c.a ? `1px solid ${V.sage100}` : `1px solid ${V.line}`,
                  padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}>
                  {c.a && <Icons.check size={10} stroke={V.sage600} sw={2.4}/>} {c.l}
                </span>
              ))}
            </div>
          </div>

          {/* อารมณ์ */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontFamily: fonts.sub, fontWeight: 500, fontSize: 14, color: V.ink }}>
                ตอนนี้รู้สึกยังไง?
              </div>
              <span style={{ fontSize: 12, color: V.mute, fontWeight: 300 }}>ไม่ตอบก็ได้ค่ะ</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { l: 'หนัก ๆ',    e: '🫧' },
                { l: 'งง ๆ',     e: '🌤' },
                { l: 'นิ่ง ๆ ดี', e: '🌱', a: true },
                { l: 'อบอุ่น',   e: '☀️' },
                { l: 'สดใส',    e: '🌿' },
              ].map(m => (
                <div key={m.l} style={{
                  flex: 1, padding: '12px 6px', textAlign: 'center', cursor: 'pointer',
                  background: m.a ? V.sage50 : V.cardSoft,
                  border: `1px solid ${m.a ? V.sage200 : V.line}`,
                  borderRadius: 14,
                }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{m.e}</div>
                  <div style={{ fontSize: 11.5, color: m.a ? V.sage700 : V.inkSoft, fontWeight: m.a ? 600 : 500 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* น้ำเสียง Vita */}
          <div style={{
            background: `linear-gradient(135deg, ${V.sage50}, ${V.oat})`,
            border: `1px solid ${V.sage100}`,
            borderRadius: 16, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 999, background: V.sage700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icons.spark size={13} stroke="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, color: V.sage700, fontWeight: 600, marginBottom: 2 }}>VITA</div>
              <div style={{ fontFamily: fonts.sub, fontSize: 13.5, fontWeight: 300, color: V.sage900, lineHeight: 1.6 }}>
                ดีมากค่ะ มื้อเช้านี้โปรตีนเริ่มต้นได้ดีแล้ว
                Vita จะชวนคุณทานเย็นเบา ๆ ราว ๆ 1 ทุ่มเพื่อให้หลับสบายคืนนี้
              </div>
            </div>
          </div>
        </div>

        <div style={{
          padding: '14px 28px 18px', borderTop: `1px solid ${V.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <button style={{
            background: 'transparent', border: 'none', color: V.mute,
            fontSize: 13, fontFamily: fonts.ui, cursor: 'pointer',
          }}>วันนี้ไม่บันทึก</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              background: V.cardSoft, border: `1px solid ${V.line}`, color: V.inkSoft,
              borderRadius: 999, padding: '10px 18px', fontSize: 13, fontWeight: 500,
              fontFamily: fonts.ui, cursor: 'pointer',
            }}>บันทึก & ปิด</button>
            <button style={{
              background: V.sage600, color: '#fff', border: 'none',
              borderRadius: 999, padding: '10px 20px', fontSize: 13, fontWeight: 500,
              fontFamily: fonts.ui, cursor: 'pointer',
              boxShadow: '0 8px 20px -10px rgba(72,102,60,0.55)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              บันทึก & ถาม Vita
              <Icons.arrow size={13} stroke="#fff" sw={2}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ModalPage = ModalPage;
