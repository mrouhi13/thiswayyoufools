import Head from 'next/head'
import Layout from '../components/layout'
import PostPreview from 'components/post-preview'
import { getAllPosts } from 'lib/api'
import { IPost } from 'interfaces'

type Props = {
  posts: IPost[]
}

const Posts = ({ posts }: Props) => {
  return (
    <Layout
      pageTitle="Blog"
      showBack={false}
    >
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>
        <meta
          name="description"
          content="This is my blog where I try to share my experiences on all interesting topics."
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

export default Posts

export const getStaticProps = async () => {
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
    props: { posts }
  }
}
