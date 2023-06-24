import { format, parseISO } from 'date-fns'

type Props = {
  dateString: string
}

export default function DateFormatter({ dateString }: Props) {
  const date = parseISO(dateString)
  return <time
    dateTime={dateString}
    title={format(date, 'EEEE dd LLLL, yyyy HH:mm z')}
  >
    {format(date, 'LLLL d, yyyy')}
  </time>
}
