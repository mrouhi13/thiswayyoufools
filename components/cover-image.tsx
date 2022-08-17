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
            alt={title}
            className='shadow-small rounded-xl'
            title={title}
            width={768}
            height={512}
            quality={70}
        />
    )
    return (
        <div className='mx-2 mt-10 mb-5'>
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
