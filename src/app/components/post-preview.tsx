import PostCover from '@/app/components/post-cover'
import PostBody from '@/app/components/post-body'
import PostMeta from '@/app/components/post-meta'
import PostTitle from '@/app/components/post-title'
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
      <PostCover slug={slug} title={title} src={coverImage.file} priority={priority}/>
      <PostMeta date={date} author={author} readingTime={readingTime}/>
      <PostTitle slug={slug} title={title}/>
      <PostBody content={excerpt}/>
    </article>
  )
}
