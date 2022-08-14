import Link from 'next/link'

type Props = {
    slug: string
}

const ReadMore = ({ slug }: Props) => {
    return (
        <div className='flex justify-end m-5'>
            <Link
                as={`/posts/${slug}`}
                href='/posts/[slug]'
            >
                <a className='text-base text-gray-500 hover:text-gray-800 duration-300 dark:text-gray-400 dark:hover:text-gray-400'>
                    Read more
                </a>
            </Link>
        </div>
    )
}

export default ReadMore
