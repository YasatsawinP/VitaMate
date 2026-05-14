// VitaMate — แดชบอร์ดมือถือ (Thai-first, conversational)

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 10, background: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I size={14} stroke={color}/>
        </div>
        <Ring size={36} stroke={4} value={ringValue} color={color} track={accent}/>
      </div>
      <div style={{ fontSize: 12, color: V.mute, fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 400, color: V.ink, letterSpacing: -0.3, lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: fonts.sub, fontSize: 11, color: V.mute, fontWeight: 300 }}>{unit}</span>
      </div>
    </div>
  );
};

const TabBar = () => {
  const tabs = [
    { i: 'home',    l: 'วันนี้', a: true },
    { i: 'chart',   l: 'แนวโน้ม' },
    { i: 'plus',    l: '', primary: true },
    { i: 'chat',    l: 'Vita' },
    { i: 'journal', l: 'บันทึก' },
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
              <span style={{ fontSize: 10, fontWeight: t.a ? 600 : 500 }}>{t.l}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileDashboard = () => {
  const draft = "เช้านี้ทานโยเกิร์ตกรีกราดน้ำผึ้ง โรยวอลนัทกับบลูเบอร์รี";

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: `radial-gradient(500px 300px at 90% -10%, #E4ECDB 0%, transparent 60%),
                   radial-gradient(400px 280px at -10% 105%, ${V.clayLight}40 0%, transparent 65%),
                   #F4EFE3`,
      fontFamily: fonts.ui, color: V.ink,
      paddingTop: 54, paddingBottom: 110,
    }}>
      {/* Header */}
      <div style={{ padding: '12px 22px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: V.mute, marginBottom: 4, fontWeight: 400 }}>
            อังคารที่ 14 พ.ค. · 9:42 น.
          </div>
          <div style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 300, letterSpacing: -0.3, color: '#3D4F33', lineHeight: 1.2 }}>
            อรุณสวัสดิ์ค่ะ<br/>
            <span style={{ fontStyle: 'italic', color: '#6E8961', fontWeight: 400 }}>คุณอปป้า</span>
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
          }}>ม</div>
        </div>
      </div>

      {/* กล่องพิมพ์เล่ามื้อ */}
      <div style={{ padding: '0 22px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.78)',
          borderRadius: 22, padding: '16px 18px 12px',
          boxShadow: '0 14px 30px -18px rgba(31,42,27,0.14)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 8,
              background: 'linear-gradient(135deg, #3D4F33, #6E8961)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icons.spark size={11} stroke="#fff"/>
            </div>
            <span style={{ fontSize: 12, color: V.inkSoft, fontWeight: 500 }}>
              เล่าให้ Vita ฟัง ว่ามื้อนี้ทานอะไร
            </span>
          </div>
          <div style={{ fontFamily: fonts.sub, fontSize: 15.5, fontWeight: 300, color: V.ink, lineHeight: 1.55, padding: '2px 0 8px' }}>
            {draft}<span style={{ display: 'inline-block', width: 1.5, height: 16, marginLeft: 2, background: '#6E8961', verticalAlign: -2 }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: `1px solid ${V.lineSoft}` }}>
            <div style={{ display: 'flex', gap: 6, flex: 1 }}>
              {[
                { i: 'plus',  l: 'ถ่ายรูป' },
                { i: 'mic',   l: 'พูดได้' },
              ].map((c) => {
                const I = Icons[c.i];
                return (
                  <span key={c.l} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '6px 10px', borderRadius: 999,
                    background: V.cardSoft, border: `1px solid ${V.lineSoft}`,
                    fontSize: 11.5, color: V.inkSoft, fontWeight: 400, cursor: 'pointer',
                  }}>
                    <I size={11} stroke={V.inkSoft}/> {c.l}
                  </span>
                );
              })}
            </div>
            <button style={{
              background: '#3D4F33', color: '#fff', border: 'none', borderRadius: 999,
              padding: '8px 16px', fontSize: 12, fontWeight: 500, fontFamily: fonts.ui,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              ให้ Vita ดู
              <Icons.arrow size={11} stroke="#fff" sw={2}/>
            </button>
          </div>
        </div>
      </div>

      {/* การ์ดสนทนาจาก Vita */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 24,
          background: 'linear-gradient(135deg, #3D4F33 0%, #6E8961 100%)',
          color: '#fff',
          padding: '20px 20px 18px',
          boxShadow: '0 20px 40px -16px rgba(61,79,51,0.4)',
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(220px 160px at 100% -10%, rgba(255,255,255,0.12), transparent),
                         radial-gradient(180px 140px at -10% 110%, ${V.clay}40, transparent)` }}/>
          <svg width="120" height="120" style={{ position: 'absolute', right: -20, top: -20, opacity: 0.10 }} viewBox="0 0 120 120" fill="none">
            <path d="M110 10C60 10 25 38 25 80c0 8 2 15 6 21" stroke="#fff" strokeWidth="1.2"/>
            <path d="M110 10c0 55-32 90-72 90-7 0-13-1-19-4" stroke="#fff" strokeWidth="1.2"/>
            <path d="M30 110l50-50" stroke="#fff" strokeWidth="1.2"/>
          </svg>

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: '#C9DCB4',
                boxShadow: '0 0 0 4px rgba(201,220,180,0.25)' }}/>
              <span style={{ fontSize: 11, opacity: 0.78, fontWeight: 500 }}>
                Vita · เมื่อสักครู่
              </span>
            </div>

            <div style={{
              fontFamily: fonts.display, fontWeight: 300, fontSize: 19, lineHeight: 1.45,
              letterSpacing: -0.2, marginBottom: 14,
            }}>
              เลือกได้น่ารักมากเลยค่ะ มื้อนี้โปรตีนกำลังพอดี
              <span style={{ opacity: 0.62 }}> น่าจะอยู่ท้องไปได้ถึงเที่ยงค่ะ</span>
            </div>

            <div style={{
              display: 'flex', gap: 14, marginBottom: 14, paddingTop: 12,
              borderTop: '1px solid rgba(255,255,255,0.12)',
            }}>
              {[
                { l: 'พลังงาน', v: '≈ 320', u: 'แคล' },
                { l: 'โปรตีน',   v: '≈ 18',  u: 'ก.' },
                { l: 'คาร์บ',    v: '≈ 30',  u: 'ก.' },
              ].map((m, i) => (
                <div key={m.l} style={{ flex: 1, paddingLeft: i ? 12 : 0,
                  borderLeft: i ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
                  <div style={{ fontSize: 10, opacity: 0.55, marginBottom: 3 }}>{m.l}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                    <span style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 300 }}>{m.v}</span>
                    <span style={{ fontFamily: fonts.sub, fontSize: 10, opacity: 0.55 }}>{m.u}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{
                flex: 1,
                background: 'rgba(255,255,255,0.95)', color: '#3D4F33',
                border: 'none', borderRadius: 12, padding: '10px',
                fontSize: 12.5, fontWeight: 500, fontFamily: fonts.ui, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}>
                <Icons.check size={12} stroke="#3D4F33" sw={2.2}/> ใช่ ตามนี้
              </button>
              <button style={{
                background: 'transparent', color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.22)', borderRadius: 12,
                padding: '10px 14px', fontSize: 12.5, fontWeight: 500, fontFamily: fonts.ui,
                cursor: 'pointer',
              }}>ปรับ</button>
            </div>
          </div>
        </div>
      </div>

      {/* แถบสุขภาพย่อ */}
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h2 style={{ margin: 0, fontFamily: fonts.sub, fontWeight: 500, fontSize: 14, color: V.ink }}>
            วันนี้ค่อย ๆ ไป
          </h2>
          <span style={{ fontSize: 11.5, color: '#6E8961', fontWeight: 500 }}>91%</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <MobileMetric icon="flame" label="พลังงาน" value="1,740" unit="/ 1,900"
            ringValue={0.91} color={V.clay} accent="#F2E3D6"/>
          <MobileMetric icon="drop"  label="น้ำดื่ม" value="5"     unit="/ 8 แก้ว"
            ringValue={0.62} color="#8FB0C4" accent="#E5EDF2"/>
          <MobileMetric icon="moon"  label="การนอน" value="7:12" unit="หลับสนิท"
            ringValue={0.90} color="#9890B0" accent="#ECE7F0"/>
        </div>
      </div>

      {/* บันทึกของ Vita */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.75)',
          borderRadius: 20, padding: 16,
          boxShadow: '0 10px 22px -16px rgba(31,42,27,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6E8961', marginBottom: 6 }}>
            <Icons.trend size={12} stroke="#6E8961"/>
            <span style={{ fontSize: 10.5, fontWeight: 600 }}>สิ่งที่ Vita สังเกตได้</span>
          </div>
          <div style={{ fontFamily: fonts.display, fontWeight: 300, fontSize: 15.5, lineHeight: 1.4, color: '#3D4F33' }}>
            วันที่คุณเดินเล่นก่อน 6 โมงเย็น คุณหลับนานขึ้น <em style={{ fontStyle: 'italic', color: '#6E8961', fontWeight: 400 }}>42 นาที</em>
          </div>
        </div>
      </div>

      <TabBar/>
    </div>
  );
};

window.MobileDashboard = MobileDashboard;
