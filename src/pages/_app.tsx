import Head from 'next/head'
import { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import 'styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon.png"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics/>
    </>
  )
}
