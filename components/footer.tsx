const Footer = () => {
    const thisYear = new Date().getFullYear()
    return (
        <footer className='flex justify-center h-12 text-gray-500 dark:text-gray-400 text-xs font-mono'>
            Majid Rouhi &copy; {thisYear}
        </footer>
    )
}

export default Footer
