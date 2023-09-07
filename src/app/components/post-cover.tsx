import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  slug?: string
  priority?: boolean
}

export default function PostCover({ title, src, slug, priority }: Props) {
  const image = (
    <Image
      src={src}
      alt={title}
      className="shadow-small rounded-xl"
      title={title}
      width={768}
      height={512}
      priority={priority}
      sizes="(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw"
    />
  )
  return (
    <div className="mx-2 mt-10 mb-5">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (image)}
    </div>
  )
}
