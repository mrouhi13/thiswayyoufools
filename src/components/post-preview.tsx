import PostBody from '@/components/post-body'
import CoverImage from '@/components/cover-image'
import PostTitle from '@/components/post-title'
import PostMeta from '@/components/post-meta'
import { IPostPreview } from '@/interfaces'

type Props = IPostPreview

export default function PostPreview({
                                      title,
                                      coverImage,
                                      date,
                                      readingTime,
                                      excerpt,
                                      slug,
                                      author,
                                      priority
                                    }: Props) {
  return (
    <article>
      <CoverImage
        slug={slug}
        title={title}
        src={coverImage.file}
        priority={priority}
      />
      <PostMeta
        date={date}
        author={author}
        readingTime={readingTime}
      />
      <PostTitle
        slug={slug}
        title={title}
      />
      <PostBody content={excerpt}/>
    </article>
  )
}
