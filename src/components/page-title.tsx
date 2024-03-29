import { ReactNode } from 'react'
import BackIcon from '@/components/icons/back'
import Link from 'next/link'

type Props = {
  showBack: boolean
  children?: ReactNode
}

export default function PageTitle({ showBack, children }: Props) {
  return (
    <>
      {showBack ? (
        <Link
          href="/"
          className="flex mx-5 items-center text-gray-500 hover:text-gray-800 transition dark:text-gray-300 dark:hover:text-gray-400"
        >
          <BackIcon/>
          Back
        </Link>
      ) : null
      }
      <h1 className={`${showBack ? 'text-6xl' : 'text-7xl'} mx-5 my-3 text-gray-700 dark:text-white`}>
        {children}
      </h1>
    </>
  )
}
