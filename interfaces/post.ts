import { IAuthor } from './author'

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
    content: string
    tags: [{
        name: string
    }]
    ogImage: {
        url: string
    }
}
