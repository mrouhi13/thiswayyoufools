import PageTitle from '@/app/components/page-title'
import PostPreview from '@/app/components/post-preview'
import { getAllPosts } from '@/lib/api'
import { Metadata } from 'next'
import React from 'react'

const pageMeta: { title: string, description: string } = {
  title: 'Blog',
  description: 'This is my blog where I try to share my experiences on all interesting topics.'
}

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
  description: pageMeta.description,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_WEBSITE_URL
  },
  twitter: {
    title: pageMeta.title,
    description: pageMeta.description,
    images: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og`,
    card: 'summary_large_image'
  },
  openGraph: {
    title: pageMeta.title,
    description: pageMeta.description,
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    images: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og`
  }
}
export default async function Posts() {
  const posts = getAllPosts(['slug', 'title', 'date', 'readingTime', 'excerpt', 'author', 'coverImage', 'priority'])

  return (
    <>
      <PageTitle title={pageMeta.title} showBack={false}/>
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
    </>
  )
}
