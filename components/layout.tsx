import React from 'react'
import Footer from 'components/footer'
import Header from 'components/header'
import PageTitle from 'components/page-title'

type Props = {
    pageTitle: string
    showBack: boolean
    children: React.ReactNode
}

const Layout = ({ pageTitle, showBack, children }: Props) => {
    return (
        <div className='dark:bg-dark'>
            <Header/>
            <main className='container-center flex-grow 2xl:mx-112 xl:mx-80 lg:mx-40 md:mx-32 sm:mx-16 my-24'>
                <PageTitle showBack={showBack}>{pageTitle}</PageTitle>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout
