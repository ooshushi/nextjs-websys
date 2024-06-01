import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className='p-4 w-screen'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className=''>
          <Link href="/">
            <img src="/pic2.jpg" alt="logo" className="w-20 h-20 mr-2" />
          </Link>
        </div>
        <nav className='flex justify-end'>
          <Link href="/" className='mx-8'>
            Home
          </Link>
          <Link href="/profile" className='mx-8'>
            Profile
          </Link>
          <Link href="/posts" className='mx-8'>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header