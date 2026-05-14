// VitaMate — หน้าแรก (Thai-first)

const LandingPage = () => {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `radial-gradient(1200px 600px at 80% -10%, ${V.sage100} 0%, transparent 60%),
                   radial-gradient(800px 500px at -10% 90%, ${V.clayLight}40 0%, transparent 60%),
                   ${V.bg}`,
      fontFamily: fonts.ui, color: V.ink, overflow: 'hidden', position: 'relative',
    }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={30} />
          <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, letterSpacing: -0.2 }}>VitaMate</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14, color: V.inkSoft }}>
          <a style={{ cursor: 'pointer' }}>วิธีใช้งาน</a>
          <a style={{ cursor: 'pointer' }}>เบื้องหลัง</a>
          <a style={{ cursor: 'pointer' }}>เรื่องเล่าผู้ใช้</a>
          <a style={{ cursor: 'pointer' }}>แพ็กเกจ</a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{
            background: 'transparent', border: 'none', color: V.inkSoft,
            fontSize: 14, fontFamily: fonts.ui, cursor: 'pointer',
          }}>เข้าสู่ระบบ</button>
          <button style={{
            background: V.sage600, color: '#fff', border: 'none',
            padding: '10px 18px', borderRadius: 999, fontSize: 14, fontWeight: 500,
            fontFamily: fonts.ui, cursor: 'pointer',
            boxShadow: '0 8px 20px -8px rgba(72,102,60,0.5)',
          }}>เริ่มต้นฟรี</button>
        </div>
      </header>

      <section style={{
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56,
        padding: '50px 64px 0', alignItems: 'center',
      }}>
        <div>
          <Pill style={{ marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: V.sage500 }}/>
            ใหม่ · AI ที่ปรับตามจังหวะของคุณ
          </Pill>
          <h1 style={{
            fontFamily: fonts.display, fontWeight: 300,
            fontSize: 68, lineHeight: 1.1, letterSpacing: -1.2,
            margin: 0, color: V.sage900,
          }}>
            ดูแลร่างกาย<br/>
            <em style={{ fontFamily: fonts.display, fontStyle: 'italic', color: V.sage500, fontWeight: 400 }}>อย่างใจเย็น</em>
          </h1>
          <p style={{
            fontSize: 17, lineHeight: 1.7, color: V.inkSoft, maxWidth: 480,
            marginTop: 22, marginBottom: 32, fontWeight: 300,
          }}>
            VitaMate ค่อย ๆ ติดตามแคลอรี่ โปรตีน น้ำดื่ม และการนอน
            แล้วชวนคุณปรับเปลี่ยนเล็ก ๆ น้อย ๆ ด้วยน้ำเสียงที่อ่อนโยน
            ไม่มี streak ไม่มีคำตัดสิน — แค่ความเข้าใจร่างกายของตัวเองมากขึ้น
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <button style={{
              background: V.sage600, color: '#fff', border: 'none',
              padding: '15px 26px', borderRadius: 999, fontSize: 15, fontWeight: 500,
              fontFamily: fonts.ui, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: '0 12px 28px -10px rgba(72,102,60,0.55)',
            }}>
              ทดลอง 14 วันแรก
              <Icons.arrow size={16} stroke="#fff" sw={2}/>
            </button>
            <button style={{
              background: 'transparent', border: `1px solid ${V.line}`,
              padding: '14px 20px', borderRadius: 999, fontSize: 15,
              fontFamily: fonts.ui, cursor: 'pointer', color: V.inkSoft,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <Icons.play size={14} fill={V.inkSoft} stroke="none"/>
              ดูตัวอย่างใน 1 นาที
            </button>
          </div>

          <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 28, color: V.mute, fontSize: 13 }}>
            <span>ได้รับการพูดถึงใน</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: V.inkSoft, fontStyle: 'italic' }}>The Cloud</span>
            <span style={{ fontFamily: fonts.display, fontSize: 16, color: V.inkSoft, letterSpacing: 1 }}>a day</span>
            <span style={{ fontFamily: fonts.sub, fontSize: 15, color: V.inkSoft, fontWeight: 600 }}>The Standard</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: V.inkSoft }}>Mango Zero</span>
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ position: 'relative', height: 560 }}>
          <div style={{
            position: 'absolute', inset: '5% 8% 5% 8%',
            background: `radial-gradient(circle at 50% 40%, ${V.sage100}, transparent 70%)`,
            filter: 'blur(20px)', borderRadius: '50%',
          }}/>

          {/* Mini dashboard preview */}
          <div style={{
            position: 'absolute', right: 0, top: 40, width: 380,
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
            borderRadius: 24, padding: 22, border: `1px solid ${V.line}`,
            boxShadow: '0 30px 60px -20px rgba(31,42,27,0.18), 0 12px 28px -16px rgba(31,42,27,0.12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: V.mute }}>วันอังคาร</div>
                <div style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 400, marginTop: 2 }}>อรุณสวัสดิ์ค่ะ คุณอปป้า</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: V.sand,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.display, color: V.rust }}>ม</div>
            </div>

            <div style={{
              background: V.cardSoft, border: `1px solid ${V.lineSoft}`, borderRadius: 16,
              padding: '12px 14px', marginBottom: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: V.sage700 }}>
                <Icons.spark size={11} stroke={V.sage700}/>
                <span style={{ fontSize: 10, fontWeight: 600 }}>เล่าให้ Vita ฟัง</span>
              </div>
              <div style={{ fontFamily: fonts.sub, fontSize: 13, fontWeight: 300, color: V.ink, lineHeight: 1.5 }}>
                "เช้านี้ทานโยเกิร์ตกรีก น้ำผึ้ง วอลนัท บลูเบอร์รี…"
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { icon: 'flame', label: 'พลังงาน', val: '320', sub: 'แคล', color: V.clay },
                { icon: 'protein', label: 'โปรตีน', val: '18', sub: 'ก.', color: V.sage500 },
                { icon: 'drop', label: 'น้ำ', val: '5/8', sub: 'แก้ว', color: '#7AA6C2' },
              ].map(m => {
                const I = Icons[m.icon];
                return (
                  <div key={m.label} style={{ background: V.cardSoft, borderRadius: 12, padding: '8px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: m.color, marginBottom: 4 }}>
                      <I size={11} stroke={m.color}/>
                      <span style={{ fontSize: 10, color: V.mute, fontWeight: 500 }}>{m.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                      <span style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 400, color: V.ink }}>{m.val}</span>
                      <span style={{ fontSize: 10, color: V.mute }}>{m.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{
            position: 'absolute', left: 0, top: 360, width: 290,
            background: V.sage600, color: '#fff',
            borderRadius: '24px 24px 24px 6px', padding: '16px 18px',
            boxShadow: '0 24px 50px -20px rgba(72,102,60,0.45)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: 0.85 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: V.sage400,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icons.spark size={12} stroke="#fff" sw={2}/>
              </div>
              <span style={{ fontSize: 11, fontWeight: 500 }}>VITA · เพื่อนคู่ใจ</span>
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6, fontFamily: fonts.sub, fontWeight: 300 }}>
              เมื่อวานเป็นวันยาว ๆ — วันนี้เราค่อย ๆ ไปนะคะ
              ลองเดินเล่นหลังมื้อเที่ยงสักหน่อย กับจิบน้ำเพิ่มอีกแก้วก็พอ
            </div>
          </div>

          <div style={{
            position: 'absolute', right: 30, bottom: 0, width: 230,
            background: V.card, borderRadius: 18, padding: '14px 16px',
            border: `1px solid ${V.line}`,
            boxShadow: '0 20px 40px -16px rgba(31,42,27,0.14)',
          }}>
            <div style={{ fontSize: 11, color: V.mute, marginBottom: 4 }}>สรุปประจำสัปดาห์</div>
            <div style={{ fontFamily: fonts.sub, fontSize: 14, fontWeight: 500, color: V.ink, lineHeight: 1.5 }}>
              วันที่เดินเล่นก่อน 6 โมงเย็น คุณหลับนานขึ้น 42 นาที
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: V.sage600, fontSize: 12 }}>
              <Icons.trend size={14}/> <span>นอนสดชื่นขึ้น 18%</span>
            </div>
          </div>

          <svg width="80" height="80" style={{ position: 'absolute', left: 240, top: 0, opacity: 0.5 }} viewBox="0 0 80 80" fill="none">
            <path d="M70 10c-30 0-50 18-50 40 0 4 1 8 3 11" stroke={V.sage400} strokeWidth="1.2"/>
            <path d="M70 10c0 28-14 45-38 45-4 0-8-1-11-3" stroke={V.sage400} strokeWidth="1.2"/>
          </svg>
        </div>
      </section>

      <section style={{ padding: '70px 64px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { i: 'flame',   t: 'โภชนาการแบบใจเย็น', d: 'แคลอรี่และโปรตีนที่นำเสนอด้วยความเข้าใจ ไม่ใช่เลข', c: V.clay },
          { i: 'drop',    t: 'น้ำดื่มที่ไม่ขัดจังหวะ', d: 'เตือนเฉพาะตอนที่จังหวะคุณจะเปิดรับ', c: '#7AA6C2' },
          { i: 'moon',    t: 'การนอนที่เข้าใจ', d: 'อ่านรูปแบบจากมือถือหรือสมาร์ตวอตช์ของคุณ', c: '#8A7BA8' },
          { i: 'spark',   t: 'AI ที่ตั้งใจฟัง', d: 'พูดคุยภาษาไทยอย่างเป็นธรรมชาติ', c: V.sage500 },
        ].map((f, i) => {
          const I = Icons[f.i];
          return (
            <div key={i} style={{ padding: '4px 4px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: V.sage50,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <I size={20} stroke={f.c}/>
              </div>
              <div style={{ fontFamily: fonts.sub, fontSize: 16, fontWeight: 500, color: V.ink, marginBottom: 6 }}>{f.t}</div>
              <div style={{ fontSize: 13, color: V.inkSoft, lineHeight: 1.6, fontWeight: 300 }}>{f.d}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

window.LandingPage = LandingPage;
