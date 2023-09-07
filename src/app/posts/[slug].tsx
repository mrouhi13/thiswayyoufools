import PageTitle from '@/app/components/page-title'
import PostCover from '@/app/components/post-cover'
import PostBody from '@/app/components/post-body'
import PostMeta from '@/app/components/post-meta'
import { IPost } from '@/interfaces'
import { getAllPosts, getPostBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  post: IPost
}

export default function Post({ post }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404}/>
  }
  return (
    <>
      <Head>
        <title>
          {post.title} | {process.env.NEXT_PUBLIC_WEBSITE_TITLE}
        </title>
        <meta
          name="description"
          content={post.metaDescription}
        />
        <link
          rel="canonical"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/posts/${post.slug}`}
        />
        <meta
          property="twitter:title"
          content={post.title}
        />
        <meta
          property="twitter:description"
          content={post.metaDescription}
        />
        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og/?title=${post.title}&author=${post.author.name}`}
        />
        <meta
          property="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="og:title"
          content={post.title}
        />
        <meta
          property="og:description"
          content={post.metaDescription}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/posts/${post.slug}`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og/?title=${post.title}&author=${post.author.name}`}
        />
      </Head>
      <PageTitle title={router.isFallback ? 'Loading...' : post.title} showBack={true}/>
      {!router.isFallback ? (
        <article>
          <PostCover
            title={post.title}
            src={post.coverImage.file}
            priority={true}
          />
          <PostMeta
            date={post.date}
            author={post.author}
            readingTime={post.readingTime}
          />
          <PostBody content={post.content}/>
        </article>
      ) : null}
    </>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'metaDescription',
    'date',
    'readingTime',
    'content',
    'author',
    'coverImage'
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
