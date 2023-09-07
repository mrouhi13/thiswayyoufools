import { IAuthor } from '@/interfaces'
import { format, parseISO } from 'date-fns'

type Props = {
  date: string
  author?: IAuthor
  readingTime: number
}

export default function PostMeta({ date, readingTime }: Props) {
  return (
    <div className="flex justify-between mx-5 my-2 text-base text-gray-500 dark:text-gray-400">
      <div>
        <time dateTime={date} title={format(parseISO(date), 'EEEE dd LLLL, yyyy HH:mm z')}>
          {format(parseISO(date), 'LLLL d, yyyy')}
        </time>
        <span>・</span>
        <span title={`It takes ${readingTime} to read this post.`}>{readingTime}</span>
      </div>
    </div>
  )
}
