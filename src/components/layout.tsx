import React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'
import PageTitle from '@/components/page-title'
import Script from 'next/script'

type Props = {
  pageTitle: string
  showBack: boolean
  children: React.ReactNode
}

export default function Layout({ pageTitle, showBack, children }: Props) {
  return (
    <div className="dark:bg-dark">
      <Header/>
      <Script
        id="google_analytics"
        dangerouslySetInnerHTML={{
          __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                            ga('create', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', 'auto');
                            ga('send', 'pageview');`
        }}
      />
      <Script
        async
        src="https://www.google-analytics.com/analytics.js"
      ></Script>
      <main className="container-center flex-grow 2xl:mx-112 xl:mx-80 lg:mx-40 md:mx-32 sm:mx-16 my-24">
        <PageTitle showBack={showBack}>{pageTitle}</PageTitle>
        {children}
      </main>
      <Footer/>
    </div>
  )
}
