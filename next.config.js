module.exports = {
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
