// VitaMate — แดชบอร์ดหลัก (v5 · Thai-first, conversational)
// บทสนทนาเป็นหัวใจ — ตัวเลขเป็นแค่เกร็ดเสริม

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

// คงไว้สำหรับหน้า Recommendations
const Sidebar = ({ active = 'home' }) => {
  const nav = [
    { id: 'home',    icon: 'home',    label: 'วันนี้' },
    { id: 'trends',  icon: 'chart',   label: 'แนวโน้ม' },
    { id: 'ai',      icon: 'chat',    label: 'Vita' },
    { id: 'journal', icon: 'journal', label: 'สมุดบันทึก' },
    { id: 'settings',icon: 'gear',    label: 'ตั้งค่า' },
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
        <div style={{ fontSize: 11.5, color: V.mute, fontWeight: 500, marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 400, color: V.ink, letterSpacing: -0.3, lineHeight: 1 }}>{value}</span>
          <span style={{ fontFamily: fonts.sub, fontSize: 12, color: V.mute, fontWeight: 300 }}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  // มื้อที่คุณมายาเพิ่งเล่าให้ Vita ฟัง
  const draft = "เช้านี้ทานโยเกิร์ตกรีกราดน้ำผึ้ง โรยวอลนัทกับบลูเบอร์รีนิดหน่อย กับกาแฟดำหนึ่งแก้ว";

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      background: `radial-gradient(1100px 600px at 85% -10%, ${S.sageMist} 0%, transparent 60%),
                   radial-gradient(800px 500px at -5% 110%, ${V.clayLight}30 0%, transparent 65%),
                   ${S.pageBg}`,
      fontFamily: fonts.ui, color: V.ink,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* แถบบนสุด */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 56px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={26} color={S.sageDeep}/>
          <span style={{ fontFamily: fonts.display, fontSize: 19, letterSpacing: -0.2, fontWeight: 400, color: S.sageInk }}>VitaMate</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { l: 'วันนี้', a: true },
            { l: 'คุยกับ Vita' },
            { l: 'สมุดบันทึก' },
          ].map((t, i) => (
            <span key={i} style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer',
              color: t.a ? S.sageInk : V.mute,
              fontWeight: t.a ? 500 : 400,
              background: t.a ? 'rgba(255,255,255,0.7)' : 'transparent',
              border: t.a ? `1px solid ${S.sageMist}` : '1px solid transparent',
            }}>{t.l}</span>
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
          }}>ม</div>
        </div>
      </header>

      {/* คอลัมน์กลาง */}
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '0 56px 36px' }}>
        <div style={{ width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* คำทักทาย — กระชับ */}
          <div style={{ textAlign: 'center', paddingTop: 6 }}>
            <div style={{ fontSize: 12, color: V.mute, letterSpacing: 0.4, marginBottom: 8, fontWeight: 400 }}>
              วันอังคารที่ 14 พฤษภาคม · 9:42 น.
            </div>
            <h1 style={{
              margin: 0, fontFamily: fonts.display, fontWeight: 300,
              fontSize: 32, letterSpacing: -0.4, color: S.sageInk, lineHeight: 1.2,
            }}>
              อรุณสวัสดิ์ค่ะ <em style={{ fontStyle: 'italic', color: S.sageDeep, fontWeight: 400 }}>คุณมายา</em>
            </h1>
          </div>

          {/* HERO — กล่องคุยกับ Vita */}
          <div style={{
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid ${S.glassBorder}`,
            borderRadius: 28,
            padding: '20px 24px 14px',
            boxShadow: '0 1px 0 rgba(31,42,27,0.03), 0 20px 50px -28px rgba(31,42,27,0.16), 0 50px 100px -60px rgba(61,79,51,0.18)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 10,
                  background: `linear-gradient(135deg, ${S.sageInk}, ${S.sageDeep})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 6px 14px -6px rgba(61,79,51,0.45)',
                }}>
                  <Icons.spark size={14} stroke="#fff"/>
                </div>
                <span style={{ fontSize: 13, color: V.inkSoft, fontWeight: 500 }}>
                  เล่าให้ Vita ฟังหน่อย ว่าวันนี้ทานอะไร
                </span>
              </div>
              <span style={{ fontSize: 12, color: V.mute, fontWeight: 300 }}>ไม่ต้องนับแคลอรี่ — แค่เล่าก็พอ</span>
            </div>

            <div style={{
              minHeight: 56, padding: '4px 2px',
              fontFamily: fonts.sub, fontSize: 19, fontWeight: 300,
              color: V.ink, lineHeight: 1.55,
            }}>
              {draft}
              <span style={{
                display: 'inline-block', width: 2, height: 20, marginLeft: 2,
                background: S.sageDeep, verticalAlign: -3,
              }}/>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, paddingTop: 12, borderTop: `1px solid ${V.lineSoft}` }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                {[
                  { i: 'plus',  l: 'ถ่ายรูปแทน' },
                  { i: 'mic',   l: 'พูดได้นะ' },
                  { i: 'apple', l: 'มื้อก่อนหน้า' },
                ].map((c) => {
                  const I = Icons[c.i];
                  return (
                    <span key={c.l} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 12px', borderRadius: 999,
                      background: V.cardSoft, border: `1px solid ${V.lineSoft}`,
                      fontSize: 12.5, color: V.inkSoft, fontWeight: 400, cursor: 'pointer',
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
                ให้ Vita ช่วยดู
                <Icons.arrow size={13} stroke="#fff" sw={2}/>
              </button>
            </div>
          </div>

          {/* การ์ดสนทนาจาก Vita — เน้นน้ำเสียงมากกว่าตัวเลข */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: `linear-gradient(135deg, ${S.sageInk} 0%, ${S.sageDeep} 100%)`,
            color: '#fff', borderRadius: 28,
            padding: '24px 28px 22px',
            boxShadow: '0 22px 50px -22px rgba(61,79,51,0.45), 0 6px 16px -8px rgba(61,79,51,0.18)',
          }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(420px 220px at 95% -10%, rgba(255,255,255,0.10), transparent 60%),
                           radial-gradient(360px 220px at -5% 110%, ${V.clay}30, transparent 70%)` }}/>
            <svg width="160" height="160" style={{ position: 'absolute', right: -10, top: -10, opacity: 0.08 }} viewBox="0 0 160 160" fill="none">
              <path d="M148 12C68 12 22 50 22 112c0 11 4 21 9 30" stroke="#fff" strokeWidth="1.4"/>
              <path d="M148 12c0 76-40 120-100 120-9 0-17-1-25-4" stroke="#fff" strokeWidth="1.4"/>
              <path d="M30 148l66-66" stroke="#fff" strokeWidth="1.4"/>
            </svg>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: '#C9DCB4',
                  boxShadow: '0 0 0 4px rgba(201,220,180,0.25)' }}/>
                <span style={{ fontSize: 11.5, opacity: 0.78, letterSpacing: 0.3, fontWeight: 500 }}>
                  Vita · ตอบเมื่อสักครู่
                </span>
              </div>

              {/* คำทักทาย/วิเคราะห์เน้นน้ำเสียง */}
              <div style={{
                fontFamily: fonts.display, fontWeight: 300,
                fontSize: 26, lineHeight: 1.45, letterSpacing: -0.2, maxWidth: 720,
              }}>
                เลือกได้น่ารักมากเลยค่ะ มื้อนี้โปรตีนกำลังพอดี
                <span style={{ opacity: 0.62 }}> อยู่ท้องไปได้ถึงเที่ยงสบาย ๆ ถ้าจิบน้ำอุ่นช่วยอีกแก้วจะยิ่งดีนะคะ</span>
              </div>

              {/* แถบโภชนาการ — เบา ๆ เป็นข้อมูลประกอบ */}
              <div style={{
                display: 'flex', gap: 18,
                marginTop: 18, paddingTop: 16,
                borderTop: '1px solid rgba(255,255,255,0.12)',
              }}>
                {[
                  { l: 'พลังงาน', v: '≈ 320', u: 'แคล' },
                  { l: 'โปรตีน',   v: '≈ 18',  u: 'ก.' },
                  { l: 'คาร์บ',    v: '≈ 30',  u: 'ก.' },
                  { l: 'ไขมัน',    v: '≈ 12',  u: 'ก.' },
                ].map((m, i) => (
                  <div key={m.l} style={{
                    flex: 1,
                    paddingLeft: i ? 16 : 0,
                    borderLeft: i ? '1px solid rgba(255,255,255,0.10)' : 'none',
                  }}>
                    <div style={{ fontSize: 11, opacity: 0.55, fontWeight: 400, marginBottom: 4 }}>{m.l}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontFamily: fonts.display, fontSize: 19, fontWeight: 300 }}>{m.v}</span>
                      <span style={{ fontFamily: fonts.sub, fontSize: 11, opacity: 0.55 }}>{m.u}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ปุ่ม */}
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                <button style={{
                  background: '#fff', color: S.sageInk, border: 'none', borderRadius: 999,
                  padding: '10px 18px', fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  <Icons.check size={13} stroke={S.sageInk} sw={2.2}/> ใช่ ตามนี้เลย
                </button>
                <button style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.22)', borderRadius: 999,
                  padding: '10px 16px', fontSize: 13, fontWeight: 500, fontFamily: fonts.ui,
                  cursor: 'pointer',
                }}>ปรับนิดหน่อย</button>
                <button style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  border: 'none',
                  padding: '10px 12px', fontSize: 13, fontWeight: 400, fontFamily: fonts.ui,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 'auto',
                }}>
                  คุยต่อ <Icons.arrow size={12} stroke="rgba(255,255,255,0.7)"/>
                </button>
              </div>
            </div>
          </div>

          {/* แถบสุขภาพย่อ */}
          <div style={{ display: 'flex', gap: 14 }}>
            <VitalChip icon="flame" label="พลังงานวันนี้" value="1,740" unit="จาก 1,900"
              ringValue={0.91} color={V.clay} accent="#F2E3D6"/>
            <VitalChip icon="drop"  label="น้ำดื่ม"     value="5"     unit="จาก 8 แก้ว"
              ringValue={0.62} color="#8FB0C4" accent="#E5EDF2"/>
            <VitalChip icon="moon"  label="การนอนคืนที่ผ่านมา" value="7 ชม. 12 นาที" unit="หลับสนิทดี"
              ringValue={0.90} color="#9890B0" accent="#ECE7F0"/>
          </div>

        </div>
      </main>
    </div>
  );
};

window.DashboardPage = DashboardPage;
