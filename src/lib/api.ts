import { IPost } from '@/interfaces'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'src/_posts')

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []): IPost {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const post = {} as IPost & Record<string, any>

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      post[field] = realSlug
    } else if (field === 'content') {
      post[field] = content
    } else if (data[field]) {
      post[field] = data[field]
    }
  })

  return post
}

export function getAllPosts(fields: string[] = []): IPost[] {
  const slugs = getPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}
