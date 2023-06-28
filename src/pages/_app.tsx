import Head from 'next/head'
import { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'
import Script from 'next/script'
import React from 'react'

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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-KLNTTNDRHV"
      ></Script>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
      </Script>
      <Component {...pageProps} />
      <Analytics/>
    </>
  )
}
