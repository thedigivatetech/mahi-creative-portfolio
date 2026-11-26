/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // ── Override defaults rather than extend where precision matters ──
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      // ── Colour tokens ──────────────────────────────────────────────
      colors: {
        background:       '#111315',
        'text-primary':   '#F5F4EF',
        accent:           '#C9F36A',
        'text-secondary': '#858A88',
        surface:          '#1A1D1F',
        border:           '#232729',
        error:            '#FF5454',
      },

      // ── Type families ─────────────────────────────────────────────
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['Manrope',       'system-ui', 'sans-serif'],
      },

      // ── Editorial type scale (clamp-based, fluid) ─────────────────
      fontSize: {
        'display-xl': ['clamp(3rem, 8.5vw, 7.5rem)',  { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 5.5vw, 5rem)', { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)',{ lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.75rem)',{ lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        // Body scale
        'body-lg':    ['1.125rem', { lineHeight: '1.7' }],
        'body-md':    ['0.9375rem',{ lineHeight: '1.65' }],
        'body-sm':    ['0.8125rem',{ lineHeight: '1.5' }],
        'label':      ['0.6875rem',{ lineHeight: '1',   letterSpacing: '0.2em' }],
        'stat':       ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },

      // ── 8px spacing system ────────────────────────────────────────
      spacing: {
        '18':  '4.5rem',   // 72px
        '22':  '5.5rem',   // 88px
        '26':  '6.5rem',   // 104px
        '30':  '7.5rem',   // 120px
        '34':  '8.5rem',   // 136px
        '38':  '9.5rem',   // 152px
        '42':  '10.5rem',  // 168px
        '46':  '11.5rem',  // 184px
        '50':  '12.5rem',  // 200px
        '52':  '13rem',    // 208px
        '56':  '14rem',    // 224px
        '60':  '15rem',    // 240px
        '72':  '18rem',    // 288px
        '84':  '21rem',    // 336px
        '96':  '24rem',    // 384px
        '112': '28rem',    // 448px
        '128': '32rem',    // 512px
      },

      // ── Max widths ────────────────────────────────────────────────
      maxWidth: {
        'screen-2xl': '1440px',
        'prose-tight': '52ch',
        'prose':       '65ch',
      },

      // ── Motion / easing ──────────────────────────────────────────
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':  'cubic-bezier(0.7, 0, 0.84, 0)',
      },

      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      // ── Grid ──────────────────────────────────────────────────────
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
