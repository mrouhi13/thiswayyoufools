import markdownStyles from './markdown-styles.module.css'
import cn from 'classnames'

type Props = {
    content: string
}

const PostBody = ({ content }: Props) => {
    return (
        <div
            className={cn(markdownStyles['markdown'], 'm-5 text-gray-800 dark:text-gray-100')}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}

export default PostBody
