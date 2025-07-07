import React from 'react'

const Navbar = () => {
  return (
    <div className='border-b-4 border-borderSecondary w-full'>
        <nav className='flex justify-between items-center'>
            <a href='/traditional' className='text-lg font-semibold'>Home</a>
            <a href='/projects' className='text-lg font-semibold'>Projects</a>
            <a href='/blogs' className='text-lg font-semibold'>Blogs</a>
            <a href='/music' className='text-lg font-semibold'>Music</a>
            <a href='/services' className='text-lg font-semibold'>Services</a>
            <a href='/contact' className='text-lg font-semibold'>Contact</a>
        </nav>
    </div>
  )
}

export default Navbar