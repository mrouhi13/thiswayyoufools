import GithubIcon from 'components/icons/github'
import TwitterIcon from 'components/icons/twitter'
import Logo from 'components/logo'

const Header = () => {
    return (
        <header className='relative'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                <div className='pt-6 lg:pt-8 flex justify-between items-center py-6 space-x-10 leading-6 dark:text-white'>
                    <a
                        href='/'
                        className='flex space-x-3 text-gray-500'
                    >
                        <Logo/>
                        <h1 className='text-xl font-light leading-8 text-gray-800 dark:text-white'>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</h1>
                    </a>
                    <div className='flex items-center justify-end flex-1 space-x-10'>
                        <div className='flex space-x-4'>
                            <a href={process.env.NEXT_PUBLIC_TWITTER_PROFILE}>
                                <TwitterIcon/>
                            </a>
                            <a href={process.env.NEXT_PUBLIC_GITHUB_PROFILE}>
                                <GithubIcon/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header
