import getConfig from 'next/config'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import PostBody from 'components/post-body'
import PostMeta from 'components/post-meta'
import CoverImage from 'components/cover-image'
import markdownToHtml from 'lib/markdownToHtml'
import { getAllPosts, getPostBySlug } from 'lib/api'
import { IPost } from 'interfaces'

const { publicRuntimeConfig: publicConfigs } = getConfig()


type Props = {
    post: IPost
}

const Post = ({ post }: Props) => {
    const router = useRouter()
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404}/>
    }
    return (
        <>
            <Head>
                <title>
                    {post.title} | {publicConfigs.app.title}
                </title>
                <meta
                    property='og:image'
                    content={post.ogImage.url}
                />
            </Head>
            <Layout
                pageTitle={router.isFallback ? 'Loading...' : post.title}
                showBack={true}
            >
                {!router.isFallback ? (
                    <article>
                        <PostMeta
                            date={post.date}
                            author={post.author}
                            readingTime={post.readingTime}
                        />
                        <CoverImage
                            title={post.title}
                            src={post.coverImage.file}
                        />
                        <PostBody content={post.content}/>
                    </article>
                ) : null}
            </Layout>
        </>
    )
}

export default Post

type Params = {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params }: Params) {
    const post = getPostBySlug(params.slug, [
        'slug',
        'title',
        'date',
        'readingTime',
        'content',
        'excerpt',
        'author',
        'coverImage',
        'ogImage',
        'tags'
    ])
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content
            }
        }
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((posts) => {
            return {
                params: {
                    slug: posts.slug
                }
            }
        }),
        fallback: false
    }
}