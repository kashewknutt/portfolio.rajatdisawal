import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='border-b-4 border-borderSecondary w-full'>
        <nav className='flex justify-between items-center'>
            <Link href='/traditional' className='text-lg font-semibold'>Home</Link>
            <Link href='/projects' className='text-lg font-semibold'>Projects</Link>
            <Link href='/blogs' className='text-lg font-semibold'>Blogs</Link>
            <Link href='/music' className='text-lg font-semibold'>Music</Link>
            <Link href='/services' className='text-lg font-semibold'>Services</Link>
            <Link href='/contact' className='text-lg font-semibold'>Contact</Link>
        </nav>
    </div>
  )
}

export default Navbar