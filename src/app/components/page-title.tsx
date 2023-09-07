import BackIcon from '@/app/components/icons/back'
import Link from 'next/link'

type Props = {
  title: string
  showBack: boolean
}

export default function PageTitle({ title, showBack }: Props) {
  return (
    <>
      {showBack ? (
        <Link href="/" className="flex mx-5 items-center text-gray-500 hover:text-gray-800 transition dark:text-gray-300 dark:hover:text-gray-400">
          <BackIcon/>
          Back
        </Link>
      ) : null
      }
      <h1 className={`${showBack ? 'text-6xl' : 'text-7xl'} mx-5 my-3 text-gray-700 dark:text-white`}>
        {title}
      </h1>
    </>
  )
}
