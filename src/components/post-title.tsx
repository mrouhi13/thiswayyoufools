import Link from 'next/link'

type Props = {
  slug: string
  title: string
}

export default function PostTitle({ slug, title }: Props) {
  return (
    <h2 className="text-3xl mx-5 dark:text-white">
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
      >
        {title}
      </Link>
    </h2>
  )
}
