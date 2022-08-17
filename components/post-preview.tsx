import PostBody from './post-body'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import PostMeta from 'components/post-meta'
import { IPostPreview } from 'interfaces'

type Props = IPostPreview

const PostPreview = ({
                         title,
                         coverImage,
                         date,
                         readingTime,
                         excerpt,
                         slug,
                         author,
                         priority
                     }: Props) => {
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

export default PostPreview
