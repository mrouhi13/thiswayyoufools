import Head from 'next/head'
import Layout from '@/components/layout'
import PostPreview from '@/components/post-preview'
import { getAllPosts } from '@/lib/api'
import { IPost } from '@/interfaces'

type Props = {
  pageMeta: {
    title: string
    description: string
  }
  posts: IPost[]
}

export default function Posts({ pageMeta, posts }: Props) {
  return (
    <Layout
      pageTitle={pageMeta.title}
      showBack={false}
    >
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>
        <meta
          name="description"
          content={pageMeta.description}
        />
        <link
          rel="canonical"
          content={process.env.NEXT_PUBLIC_WEBSITE_URL}
        />
        <meta
          property="twitter:title"
          content={pageMeta.title}
        />
        <meta
          property="twitter:description"
          content={pageMeta.description}
        />
        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og`}
        />
        <meta
          property="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="og:title"
          content={pageMeta.title}
        />
        <meta
          property="og:description"
          content={pageMeta.description}
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_WEBSITE_URL}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og`}
        />
      </Head>
      {posts.map((post, index) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          readingTime={post.readingTime}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
          priority={(index === 0)}
        />
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const pageMeta = {
    'title': 'Blog',
    'description': 'This is my blog where I try to share my experiences on all interesting topics.',
  }

  const posts = getAllPosts([
    'slug',
    'title',
    'date',
    'readingTime',
    'excerpt',
    'author',
    'coverImage',
    'priority'
  ])

  return {
    props: { pageMeta, posts }
  }
}
