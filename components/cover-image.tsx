import Image from 'next/future/image'
import Link from 'next/link'

type Props = {
    title: string
    src: string
    slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
    const image = (
        <Image
            src={src}
            alt={`Cover Image for ${title}`}
            className='shadow-small my-10 rounded-xl'
            title={title}
            width={768}
            height={512}
        />
    )
    return (
        <div className='mx-2'>
            {slug ? (
                <Link
                    as={`/posts/${slug}`}
                    href='/posts/[slug]'
                >
                    <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </div>
    )
}

export default CoverImage
