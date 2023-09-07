import GithubIcon from '@/app/components/icons/github'
import XIcon from '@/app/components/icons/x'
import Logo from '@/app/components/logo'
import '@/styles/globals.css'
import { Forum } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const forum = Forum({ subsets: ['latin'], weight: '400' })

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" dir="ltr">
    <body>
    <div className={`dark:bg-dark ${forum.className}`}>
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="pt-6 lg:pt-8 flex justify-between items-center py-6 space-x-10 leading-6 dark:text-white">
            <Link href="/" className="flex space-x-3 text-gray-500">
              <Logo/>
              <h1 className="text-xl font-light leading-8 text-gray-800 dark:text-white">{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</h1>
            </Link>
            <div className="flex items-center justify-end flex-1 space-x-10">
              <div className="flex space-x-4">
                <Link href={`https://x.com/${process.env.NEXT_PUBLIC_X_ACCOUNT}`} target="_blank">
                  <XIcon/>
                </Link>
                <Link href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_ACCOUNT}`} target="_blank">
                  <GithubIcon/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container-center flex-grow 2xl:mx-112 xl:mx-80 lg:mx-40 md:mx-32 sm:mx-16 my-24">
        {children}
      </main>
      <footer className="flex justify-center h-12 text-gray-500 dark:text-gray-400 text-xs font-mono">
        &copy; {new Date().getFullYear()} Majid Rouhi
      </footer>
    </div>
    </body>
    </html>
  )
}
