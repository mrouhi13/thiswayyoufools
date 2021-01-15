module.exports = {
    purge: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'media',
    theme: {
        extend: {
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
            screens: {
                xxl: '1600px',
                xl: '1200px',
                lg: '992px',
                md: '768px',
                sm: '576px',
                xs: '480px',
                xxs: { max: '479px' }
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [],
    prefix: 'tw-',
    important: true
}

