import getConfig from 'next/config'
import Head from 'next/head'
import Layout from '../components/layout'
import PostPreview from 'components/post-preview'
import { getAllPosts } from 'lib/api'
import { IPost } from 'interfaces'

const { publicRuntimeConfig: publicConfigs } = getConfig()

type Props = {
    posts: IPost[]
}

const Posts = ({ posts }: Props) => {
    return (
        <Layout
            pageTitle='Blog'
            showBack={false}
        >
            <Head>
                <title>Posts | {publicConfigs.app.title}</title>
            </Head>
            {posts.map((post) => (
                <PostPreview
                    key={post.slug}
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    readingTime={post.readingTime}
                    author={post.author}
                    slug={post.slug}
                    excerpt={post.excerpt}
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
        'coverImage'
    ])

    return {
        props: { posts }
    }
}
