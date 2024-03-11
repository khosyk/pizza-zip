'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Header() {
  const { status, data } = useSession();
  const [userName, setUserName] = useState('');
  
  useEffect(()=>{
    if(data?.user){
      const isUser = data?.user?.name || data?.user?.email
      if(isUser){
        const name = isUser.split(' ')[0]
        setUserName(name)
      }
    }
  },[data])
  

  return (
    <header className="flex items-center justify-between p-5">
      <nav className="flex gap-8 items-center text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">
          PIZZA ZIP
        </Link>
        <Link href='/'>Home</Link>
        <Link href='/'>Menu</Link>
        <Link href='/'>About</Link>
        <Link href='/'>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <>
          <Link href='/profile' className='whitespace-nowrap'>Hello, {userName}</Link>
          <button
            type='button'
            onClick={() => signOut()}
            className="bg-primary text-white rounded-full px-8 py-2"
            >
            Logout
          </button>
            </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href='/login'>Login</Link>
            <Link
              href='/register'
              className="bg-primary text-white rounded-full px-8 py-2"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
