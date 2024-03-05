'use client'

import Loading from '@/components/layout/Home/Loading'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// type Props = {}

export default function Profile() {
  const { status, data } = useSession()
  const [name,setName] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [saved,setSaved] = useState<boolean>(false)
  const [isError,setIsError] = useState<boolean>(false)

  useEffect(() => {
    if(status === 'authenticated'){
      if(data?.user?.name){
        setName(data.user.name)
      }
    }

    if(status !== 'loading'){
      setLoading(true)
    }
  }, [status])
  

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const userImage = data?.user?.image
  const userEmail = data?.user?.email ? data?.user?.email : ''

  const handleInput = (e:ChangeEvent<HTMLInputElement>) =>{
    setName(e.currentTarget.value)
  }

  const handleProfileEdit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setSaved(false)
      setIsError(false)
      const res = await fetch('/api/profile',{
        method:'PUT',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({name})
      })
      if(res.ok){
        setSaved(true)
        return 
      }
      Error('ERROR PROFILE SAVE')
    }catch(err){
      setSaved(false)
      setIsError(true);
    }
  }

  if (!loading) {
    return (
      <section>
        <h1>LOADING...</h1>
        <Loading />
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-center font-semibold text-primary text-4xl mb-4">
        프로필
      </h1>
      <div className='max-w-md mx-auto'>
        {saved && <h2 className='bg-green-200 border border-green-400 py-4 px-4 mb-2 rounded-xl'>
          프로필 저장 성공!
        </h2>}
        {isError && <h2 className='bg-red-200 border border-red-400 py-4 px-4 mb-2 rounded-xl'>
          프로필 저장 실패<br/>잠시후 다시 시도해주세요
        </h2>}
      </div>
      <div className="max-w-md mx-auto">
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
          <form onSubmit={handleProfileEdit} className="flex flex-col grow justify-between">
            <input className='' type="text" onChange={handleInput} value={name} placeholder="이름을 입력해주세요" />
            <input type="text" placeholder='이메일' disabled value={userEmail} />
            <button className='bg-primary py-2 rounded-xl' type="submit" >
              저장하기
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
