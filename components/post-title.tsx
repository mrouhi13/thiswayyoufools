import Link from 'next/link'

type Props = {
    slug: string
    title: string
}

const PostTitle = ({ slug, title }: Props) => {
    return (
        <h3 className='text-3xl mx-5 dark:text-white'>
            <Link
                as={`/posts/${slug}`}
                href='/posts/[slug]'
            >
                <a>{title}</a>
            </Link>
        </h3>
    )
}

export default PostTitle
