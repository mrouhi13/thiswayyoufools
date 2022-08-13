module.exports = {
    publicRuntimeConfig: {
        app: {
            domain: process.env.WEBSITE_DOMAIN,
            title: process.env.WEBSITE_TITLE,
            logo: '/assets/logo.png',
            links: {
                twitterProfile: `https://twitter.com/mezzotweets`,
                githubProfile: `https://github.com/mrouhi13`,
                githubRepo: `https://github.com/mrouhi13/thiswayyoufools`,
                contactEmail: `mailto:mrouhi13@gmail.com`
            }
        }
    },
    pageExtensions: ['ts', 'tsx'],
    reactStrictMode: true,
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
    // webpack: (config, { isServer }) => {
    //     if (isServer) {
    //         require('./scripts/generate-sitemap')
    //     }
    //     return config
    // },
}
