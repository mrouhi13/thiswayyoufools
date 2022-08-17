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
                    {/*<meta*/}
                    {/*    name='viewport'*/}
                    {/*    content='width=device-width, initial-scale=1, viewport-fit=cover'*/}
                    {/*/>*/}
                    <meta
                        name='description'
                        content='This is my blog where I try to share my experiences on all interesting topics.'
                    />

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
                            __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                                    ga('create', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', 'auto');
                                    ga('send', 'pageview');`
                        }}
                    />
                    <script
                        async
                        src='https://www.google-analytics.com/analytics.js'
                    ></script>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
