// Shared design tokens, icons and atoms for VitaMate.
// Sage green + earth palette, Inter / Kanit / Prompt type system.

const V = {
  // Surfaces
  bgOuter:   '#EDE6D6', // warm beige (canvas behind app)
  bg:        '#F6F1E6', // off-white app bg
  bgWarm:    '#EFE6D2', // toasted cream
  card:      '#FFFFFF',
  cardSoft:  '#FBF7EE',

  // Sage scale
  sage50:    '#EEF2E5',
  sage100:   '#DBE4C9',
  sage200:   '#BFCFA8',
  sage300:   '#9DB585',
  sage400:   '#7A9A6A',
  sage500:   '#5E7F50',
  sage600:   '#48663C',
  sage700:   '#344B2C',
  sage900:   '#1E2C19',

  // Earth + accent
  clay:      '#C77B57',
  clayLight: '#E9C8B4',
  sand:      '#D9C8A4',
  oat:       '#E8DFC9',
  honey:     '#D9A85C',
  rose:      '#C58A8A',
  rust:      '#A86442',

  // Text
  ink:       '#1F2A1B',
  inkSoft:   '#3D4A36',
  mute:      '#7A816F',
  muteSoft:  '#A8AC9D',
  line:      'rgba(31,42,27,0.08)',
  lineSoft:  'rgba(31,42,27,0.05)',
};

// Tiny stroke icon set. 1.6px strokes, rounded joins. 24x24 viewbox.
const Icon = ({ d, size = 20, stroke = 'currentColor', fill = 'none', sw = 1.6, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children || <path d={d} />}
  </svg>
);

const Icons = {
  leaf: (p) => <Icon {...p}><path d="M20 4c-7 0-13 4-13 11 0 2 1 4 2 5"/><path d="M20 4c0 7-4 13-11 13-2 0-4-1-5-2"/><path d="M4 20l9-9"/></Icon>,
  spark: (p) => <Icon {...p}><path d="M12 3v5"/><path d="M12 16v5"/><path d="M3 12h5"/><path d="M16 12h5"/><path d="M6 6l3 3"/><path d="M15 15l3 3"/><path d="M18 6l-3 3"/><path d="M9 15l-3 3"/></Icon>,
  flame: (p) => <Icon {...p}><path d="M12 3c1 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4-1 3 1 4 2 4 0-3-2-5 0-9z"/></Icon>,
  drop: (p) => <Icon {...p}><path d="M12 3c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11z"/></Icon>,
  moon: (p) => <Icon {...p}><path d="M20 14a8 8 0 1 1-10-10 7 7 0 0 0 10 10z"/></Icon>,
  protein: (p) => <Icon {...p}><path d="M5 9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M9 9l6 6M15 9l-6 6"/></Icon>,
  home: (p) => <Icon {...p}><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"/></Icon>,
  chart: (p) => <Icon {...p}><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></Icon>,
  chat: (p) => <Icon {...p}><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 4v-4H6a2 2 0 0 1-2-2z"/></Icon>,
  journal: (p) => <Icon {...p}><path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h12"/></Icon>,
  gear: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>,
  plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  arrow: (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>,
  arrowUp: (p) => <Icon {...p}><path d="M12 19V5M5 12l7-7 7 7"/></Icon>,
  check: (p) => <Icon {...p}><path d="M4 12l5 5L20 6"/></Icon>,
  close: (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>,
  search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></Icon>,
  bell: (p) => <Icon {...p}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>,
  sun: (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/></Icon>,
  apple: (p) => <Icon {...p}><path d="M12 7c-2-2-6-2-7 1-2 4 1 12 4 12 1 0 2-.5 3-.5s2 .5 3 .5c3 0 6-8 4-12-1-3-5-3-7-1z"/><path d="M12 7c0-2 1-4 3-4"/></Icon>,
  bowl: (p) => <Icon {...p}><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M7 7c1-1 3-1 4 0M13 5c1-1 3-1 4 0"/></Icon>,
  walk: (p) => <Icon {...p}><circle cx="13" cy="4" r="2"/><path d="M9 21l3-6 3 3 3-1"/><path d="M9 12l3-4 3 3-1 4"/></Icon>,
  pause: (p) => <Icon {...p}><path d="M9 5v14M15 5v14"/></Icon>,
  play: (p) => <Icon {...p}><path d="M7 5l12 7-12 7z"/></Icon>,
  mic: (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></Icon>,
  send: (p) => <Icon {...p}><path d="M4 12l16-8-6 18-3-7-7-3z"/></Icon>,
  trend: (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-9"/><path d="M14 6h7v7"/></Icon>,
};

// Tiny brand mark — a soft sage leaf inside a ring.
const Logo = ({ size = 28, color = V.sage500 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" fill={V.sage50} stroke={color} strokeWidth="1.2" opacity="0.4"/>
    <path d="M22 9c-7 0-12 4-12 10 0 1 .4 2 1 3" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M22 9c0 6-3 11-9 11-1 0-2-.2-3-1" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M11 22l7-7" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

// Progress ring with optional inner label slot via children.
const Ring = ({ size = 120, stroke = 10, value = 0.65, color = V.sage400, track = V.sage50, rounded = true, children }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c * (1 - value)} strokeLinecap={rounded ? 'round' : 'butt'}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};

// Card with soft shadow + warm border.
const Card = ({ style, children, soft, padding = 24, ...rest }) => (
  <div {...rest} style={{
    background: soft ? V.cardSoft : V.card,
    borderRadius: 24,
    padding,
    boxShadow: '0 1px 0 rgba(31,42,27,0.04), 0 6px 18px -8px rgba(31,42,27,0.08), 0 24px 48px -32px rgba(31,42,27,0.10)',
    border: `1px solid ${V.line}`,
    ...style,
  }}>{children}</div>
);

// Pill / tag
const Pill = ({ children, color = V.sage50, fg = V.sage600, style }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: color, color: fg,
    fontSize: 12, fontWeight: 500, letterSpacing: 0.1,
    padding: '5px 10px', borderRadius: 999, ...style,
  }}>{children}</span>
);

// Type uses Thai-first fonts: Prompt for UI/body, Kanit for display moments.
const fonts = {
  display: 'Kanit, "IBM Plex Sans Thai", "Inter", sans-serif',
  sub:     'Prompt, "IBM Plex Sans Thai", "Inter", sans-serif',
  ui:      'Prompt, "IBM Plex Sans Thai", "Inter", system-ui, sans-serif',
};

Object.assign(window, { V, Icons, Logo, Ring, Card, Pill, fonts });
