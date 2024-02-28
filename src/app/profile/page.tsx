'use client'

import Loading from '@/components/layout/Home/Loading'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

// type Props = {}

export default function Profile() {
  const {status, data} = useSession()

  if(status === 'loading'){
    return <section>
      <h1>
        LOADING...
      </h1>
      <Loading/>
    </section>
  }

  if(status === 'unauthenticated'){
    return redirect('/login')
  }
  
  const userImage = data?.user?.image;

  return (
    <section>
      <h1 className="text-center font-semibold text-primary text-4xl">
        프로필
      </h1>
      <form className='max-w-xs mx-auto border'>
        <div>
          <Image src={userImage as string} width='64' height='64' alt='Avatar' />
        </div>
      </form>
    </section>
  )
}