import { IAuthor } from '@/interfaces'
import DateFormatter from '@/components/date-formatter'

type Props = {
  date: string
  author: IAuthor
  readingTime: number
}

export default function PostMeta({ date, readingTime, author }: Props) {
  return (
    <div className="flex justify-between mx-5 my-2 text-base text-gray-500 dark:text-gray-400">
      <div>
        <DateFormatter dateString={date}/>
        <span>・</span>
        <span title={`It takes ${readingTime} to read this post.`}>{readingTime}</span>
      </div>
    </div>
  )
}
