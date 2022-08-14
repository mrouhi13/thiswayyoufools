const Footer = () => {
    const thisYear = new Date().getFullYear()
    return (
        <footer className='flex justify-center h-12 text-gray-400'>
            Majid Rouhi &copy; {thisYear}
        </footer>
    )
}

export default Footer
