import { useEffect, useState } from "react"


const DashboardFooter = () => {
    const [year, setYear] = useState('')

    useEffect(() => {
        const year = new Date().getFullYear()
        setYear(year.toString())
    }, [])

    return (
        <footer className="w-full flex justify-center items-center py-6 bg-color2">
            <p className="text-sm text-gray-300">©{year} Web3bridge built on Base. All rights reserved.</p>
        </footer>
    )
}

export default DashboardFooter