'use client'

import Loading from '@/components/layout/Home/Loading'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

// type Props = {}

export default function Profile() {
  const { status, data } = useSession()

  if (status === 'loading') {
    return (
      <section>
        <h1>LOADING...</h1>
        <Loading />
      </section>
    )
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const userImage = data?.user?.image
  const userEmail = data?.user?.email ? data?.user?.email : ''

  return (
    <section>
      <h1 className="text-center font-semibold text-primary text-4xl mb-4">
        프로필
      </h1>
      <form className="max-w-md mx-auto">
        <div className="flex gap-4">
          <div>
            <Image
              className='rounded-xl mb-4'
              src={userImage as string}
              width="100"
              height="100"
              objectFit='contain'
              alt="Avatar"
            />
            <button type='button' className='w-full border py-2 rounded-xl'>이미지 변경</button>
          </div>
          <div className="flex flex-col grow justify-between">
            <input className='' type="text" placeholder="이름을 입력해주세요" />
            <input type="text" placeholder='이메일' disabled value={userEmail} />
            <button className='bg-primary py-2 rounded-xl' type="submit" onClick={() => {}}>
              저장하기
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
