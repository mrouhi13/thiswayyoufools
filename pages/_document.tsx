import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html
                lang='en'
                dir='ltr'
                className='leading-tight'
            >
                <Head>
                    <meta charSet='utf-8'/>
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1, viewport-fit=cover'
                    />
                    <meta
                        name='description'
                        content='This is my blog where I try to share my experiences on all interesting topics.'
                    />
                    <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>

                    <link
                        rel='icon'
                        type='image/svg+xml'
                        href='/assets/favicon/favicon.svg'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        href='/assets/favicon/favicon.png'
                    />
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                    window.dataLayer = window.dataLayer || []
                                    function gtag(){dataLayer.push(arguments)}
                                    gtag('js', new Date());
                                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                        `
                        }}
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
