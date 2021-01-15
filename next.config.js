module.exports = {
    publicRuntimeConfig: {
        app: {
            domain: process.env.APP_DOMAIN,
            title: process.env.APP_TITLE,
            logo: '/images/logo.svg',
            imagesDir: '/media/pages/',
            tags: {
            },
            links: {
                aboutPage: '/about',
                contactEmail: `mailto:hello@${process.env.APP_DOMAIN}`,
                twitterAccount: `https://twitter.com/laum-project`,
                githubRepo: `https://github.com/mrouhi13/laum-project`
            }
        }
    },
    pageExtensions: ['ts', 'tsx'],
    reactStrictMode: true
}
