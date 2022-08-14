module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'media',
    theme: {
        container: {
            center: true
        },
        extend: {
            margin: {
                112: '28rem'
            },
            fontFamily: {
                serif: ['Cormorant\\ Infant', 'serif']
            },
            letterSpacing: {
                tighter: '-.04em'
            },
            lineHeight: {
                tight: 1.2
            },
            fontSize: {
                '5xl': '2.5rem',
                '6xl': '2.75rem',
                '7xl': '4.5rem',
                '8xl': '6.25rem'
            },
            boxShadow: {
                small: '0 5px 10px rgba(0, 0, 0, 0.12)',
                medium: '0 8px 30px rgba(0, 0, 0, 0.12)'
            },
            borderRadius: {
                xl: '0.75rem',
                xxl: '1rem'
            },
            colors: {
                'dark': '#121212'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [],
    important: true
}
