import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

export default function MyApp() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-KLNTTNDRHV"
      ></Script>
      <Script id="google-tag-manager">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
      </Script>
      <Analytics/>
    </>
  )
}
