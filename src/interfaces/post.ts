import { IAuthor } from '@/interfaces/author'

export interface IPostPreview {
  slug: string
  title: string
  date: string
  readingTime: number
  excerpt: string
  author: IAuthor
  priority: boolean
  coverImage: {
    file: string
    sourceName?: string
    sourceUrl?: string
  }
}

export interface IPost extends IPostPreview {
  metaDescription: string
  content: string
  canonicalUrl?: string
}
