import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'


const Navbar = () => {
    return (
        <div className='flex justify-between p-4 border-b-[1px] shadow-sm'>
            <div className='flex items-center gap-4 md:gap-10'>
                <Link href="/" className="logo">
                    <Image src="/logo.png" alt='logo' width={140} height={60} priority />
                </Link>
                <ul>
                    <li className='flex gap-2 md:gap-6' >
                        <Link href="/" className='p-2 hover:bg-gray-200 rounded-sm transition-all'>Home</Link>
                        <Link href="/" className='p-2 hover:bg-gray-200 rounded-sm transition-all'>History</Link>
                        <Link href="/" className='p-2 hover:bg-gray-200 rounded-sm transition-all'>Help</Link>
                    </li>
                </ul>
            </div>
            <UserButton afterSignOutUrl="/" />

        </div>
    )
}

export default Navbar