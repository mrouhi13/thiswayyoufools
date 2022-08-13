import PostBody from './post-body'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import PostMeta from 'components/post-meta'
import ReadMore from 'components/read-more'
import { IPostPreview } from 'interfaces'

type Props = IPostPreview

const PostPreview = ({
                         title,
                         coverImage,
                         date,
                         readingTime,
                         excerpt,
                         slug,
                         author
                     }: Props) => {
    return (
        <article>
            <CoverImage
                slug={slug}
                title={title}
                src={coverImage.file}
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
            <ReadMore slug={slug}/>
        </article>
    )
}

export default PostPreview
