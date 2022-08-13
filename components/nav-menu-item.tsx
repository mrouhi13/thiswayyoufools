type Props = {
    title: string
    url: string
}

const NavMenuItem = ({ title, url }: Props) => {
    return (
        <a
            href={url}
            className='text-base font-medium text-gray-500 hover:text-gray-900'
        >
            {title}
        </a>
    )
}

export default NavMenuItem
