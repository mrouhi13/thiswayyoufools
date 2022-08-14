import { ReactNode } from 'react'
import BackIcon from 'components/icons/back'

type Props = {
    showBack: boolean
    children?: ReactNode
}

const PageTitle = ({ showBack, children }: Props) => {
    return (
        <>
            {showBack ? (
                <a
                    href='/'
                    className='flex mx-5 items-center text-gray-500 hover:text-gray-800 transition dark:text-gray-300 dark:hover:text-gray-400'
                >
                    <BackIcon/>
                    Back
                </a>
            ) : null
            }
            <h1 className='text-7xl mx-5 my-3 text-gray-700 dark:text-white'>
                {children}
            </h1>
        </>
    )
}

export default PageTitle
