// VitaMate — หน้าคุยกับ Vita (Thai-first)

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
      <div style={{ maxWidth: 480 }}>
        {!isUser && (
          <div style={{ fontSize: 11.5, color: V.mute, marginBottom: 4, fontWeight: 500 }}>
            Vita · {time}
          </div>
        )}
        <div style={{
          background: isUser ? V.sage600 : V.card,
          color: isUser ? '#fff' : V.ink,
          fontFamily: fonts.sub, fontWeight: isUser ? 400 : 300, fontSize: 16, lineHeight: 1.6,
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

      {/* คอลัมน์กลาง — บทสนทนา */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '28px 36px', overflow: 'hidden' }}>
        {/* ส่วนหัว */}
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
              <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 400, letterSpacing: -0.2 }}>
                Vita
              </div>
              <div style={{ fontSize: 12.5, color: V.mute, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: V.sage500 }}/>
                กำลังฟังอยู่ค่ะ · ปรับให้ตามที่คุณรู้สึก
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Pill color={V.oat} fg={V.rust}>อารมณ์สัปดาห์นี้: นิ่ง ๆ ดี</Pill>
            <Pill>โหมด: ค่อย ๆ ปรับ</Pill>
          </div>
        </div>

        {/* บทสนทนา */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px 0 8px', marginTop: 12 }}>
          <div style={{
            textAlign: 'center', fontSize: 12, color: V.mute, marginBottom: 18, fontWeight: 400,
          }}>วันนี้ · 8:14 น.</div>

          <Message from="vita" time="8:14 น.">
            อรุณสวัสดิ์ค่ะคุณอปป้า เมื่อคืนหลับไป 7 ชั่วโมง 12 นาที — ช่วงหลับลึกที่สุดอยู่ก่อน 5 โมงเช้านิดหน่อยค่ะ
            วันนี้ร่างกายเป็นยังไงบ้างคะ?
          </Message>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginLeft: 42, marginBottom: 18 }}>
            {[
              { l: 'สบายดี' },
              { l: 'เพลียนิดหน่อย', a: true },
              { l: 'สดชื่น' },
              { l: 'ปวดเมื่อย' },
              { l: 'กังวลใจ' },
            ].map((c) => (
              <Pill key={c.l} color={c.a ? V.sage100 : V.card} fg={c.a ? V.sage700 : V.inkSoft}
                style={{ padding: '8px 14px', fontSize: 13, fontWeight: c.a ? 500 : 400, border: `1px solid ${V.line}`, cursor: 'pointer' }}>
                {c.l}
              </Pill>
            ))}
          </div>

          <Message from="user">เพลียนิดหน่อยค่ะ เมื่อวานยาวนิดหนึ่ง</Message>

          <Message from="vita" time="8:15 น.">
            เข้าใจค่ะ งั้นวันนี้เราผ่อนเป้าหมายลงนิดนึง ไม่ต้องไล่ตัวเลขนะคะ
            Vita ขออนุญาตชวนทำสิ่งเล็ก ๆ เลือกอันที่รู้สึกเหมาะกับวันนี้ก็พอค่ะ:
          </Message>

          {/* การ์ดคำแนะนำ */}
          <div style={{ marginLeft: 42, marginBottom: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: 'bowl',   tag: 'มื้อเช้า',   color: V.clay,    title: 'โอ๊ตอุ่น ๆ ราดเนยอัลมอนด์กับเบอร์รี',
                sub: '~ 380 แคล · โปรตีน 14 ก. · ค่อย ๆ ปลดปล่อยพลังงาน', accent: '#F5E5DA' },
              { icon: 'drop',   tag: 'น้ำดื่ม',     color: '#7AA6C2', title: 'น้ำอุ่นบีบมะนาวสักแก้ว',
                sub: 'วันที่เพลีย คุณมักลืมจิบน้ำตอนเช้า', accent: '#E2EDF3' },
              { icon: 'walk',   tag: 'ขยับตัว',    color: V.sage500, title: 'เดินเล่น 12 นาที ช่วงสาย ๆ',
                sub: 'แสงแดดอ่อน ๆ ช่วยปรับวงจรร่างกาย', accent: V.sage50 },
              { icon: 'moon',   tag: 'ก่อนนอน',    color: '#8A7BA8', title: 'หรี่ไฟลงตอน 4 ทุ่ม 15 น.',
                sub: 'คุณจะหลับเร็วขึ้นประมาณ 18 นาที', accent: '#ECE5F1' },
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
                    <div style={{ color: r.color, marginBottom: 4, fontSize: 11, letterSpacing: 0.3, fontWeight: 600 }}>{r.tag}</div>
                    <div style={{ fontFamily: fonts.sub, fontWeight: 500, fontSize: 14.5, color: V.ink, marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 12.5, color: V.mute, lineHeight: 1.5 }}>{r.sub}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <button style={{ background: V.sage50, color: V.sage700, border: 'none',
                        borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.ui }}>
                        เพิ่มลงวันนี้
                      </button>
                      <button style={{ background: 'transparent', color: V.mute, border: 'none',
                        borderRadius: 999, padding: '5px 8px', fontSize: 12, cursor: 'pointer', fontFamily: fonts.ui }}>
                        ไว้ก่อน
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Message from="vita" time="8:16 น.">
            อีกเรื่องเล็ก ๆ — สัปดาห์นี้คุณได้โปรตีนครบเป้า 5 จาก 7 วันแล้วนะคะ
            นั่นคือก้าวที่จริงเลยค่ะ ไม่มีคำว่า "เพอร์เฟกต์" หรอก
            มีแค่จังหวะที่เราค่อย ๆ ดูแลกัน 🌱
          </Message>
        </div>

        {/* กล่องพิมพ์ */}
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
            placeholder="พิมพ์บอก Vita ว่ารู้สึกยังไง หรือทานอะไรไป…"
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

      {/* แถบขวา — สิ่งที่ Vita สังเกตได้ */}
      <aside style={{ width: 300, padding: '28px 28px 28px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 12.5, color: V.mute, fontWeight: 500 }}>
          สิ่งที่ Vita สังเกตได้
        </div>

        <Card padding={18}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: V.sage600 }}>
            <Icons.trend size={15} stroke={V.sage600}/>
            <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 0.3 }}>รูปแบบที่เห็น</span>
          </div>
          <div style={{ fontFamily: fonts.sub, fontSize: 15, fontWeight: 500, lineHeight: 1.5, color: V.ink }}>
            วันที่คุณทานข้าวเย็นก่อน 2 ทุ่ม คุณหลับนานขึ้นเฉลี่ย 42 นาที
          </div>
          <div style={{ fontSize: 12.5, color: V.mute, marginTop: 8, lineHeight: 1.6 }}>
            จากข้อมูล 21 วันล่าสุดค่ะ จะให้ Vita ช่วยเตือนตอนเย็นวันธรรมดามั้ยคะ?
          </div>
        </Card>

        <Card padding={18} style={{ background: V.oat, border: `1px solid ${V.sand}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: V.rust }}>
            <Icons.sun size={15} stroke={V.rust}/>
            <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 0.3 }}>โฟกัสของวันนี้</span>
          </div>
          <div style={{ fontFamily: fonts.sub, fontSize: 15, fontWeight: 500, lineHeight: 1.5, color: V.sage900 }}>
            เช้าค่อย ๆ บ่ายเบา ๆ
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <div style={{ flex: 1, height: 6, background: 'rgba(168,100,66,0.15)', borderRadius: 999 }}>
              <div style={{ width: '40%', height: '100%', background: V.rust, borderRadius: 999 }}/>
            </div>
            <span style={{ fontSize: 11.5, color: V.rust, fontWeight: 500 }}>2 จาก 5</span>
          </div>
        </Card>

        <Card padding={18}>
          <div style={{ fontSize: 11.5, color: V.mute, fontWeight: 600, marginBottom: 10 }}>
            อุปกรณ์ที่เชื่อมไว้
          </div>
          {[
            { l: 'Apple Health', s: 'การนอน · ก้าวเดิน · หัวใจ', on: true },
            { l: 'Oura Ring',    s: 'ความพร้อม · HRV',           on: true },
            { l: 'MyFitnessPal', s: 'มื้ออาหาร',                 on: false },
          ].map(c => (
            <div key={c.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: `1px solid ${V.lineSoft}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: V.sage50,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.apple size={14} stroke={V.sage600}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: V.ink, fontWeight: 500 }}>{c.l}</div>
                <div style={{ fontSize: 11.5, color: V.mute }}>{c.s}</div>
              </div>
              <div style={{
                width: 28, height: 16, borderRadius: 999,
                background: c.on ? V.sage500 : V.sage50,
                position: 'relative', flexShrink: 0,
              }}>
                <div style={{ position: 'absolute', top: 2, left: c.on ? 14 : 2,
                  width: 12, height: 12, borderRadius: 999, background: '#fff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}/>
              </div>
            </div>
          ))}
        </Card>
      </aside>
    </div>
  );
};

window.RecommendationsPage = RecommendationsPage;
