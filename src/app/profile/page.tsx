'use client'

import Loading from '@/components/layout/Loading'
import toaster from '@/utils/login/toaster'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export default function Profile() {
  const session = useSession()
  const { status, data } = session
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [tel, setTel] = useState('')
  const [address, setAddress] = useState('')

  const userEmail = data?.user?.email ? data?.user?.email : ''

  useEffect(() => {
    if (status === 'authenticated') {
      if (data?.user?.name) setName(data.user.name)
      if (data?.user?.image) setImage(data.user.image)
      fetch('/api/profile', {
        method: 'GET',
      })
        .then(async res => {
          if (res.ok) {
            const userData = await res.json()
            if (userData.address) setAddress(userData.address)
            if (userData.tel) setTel(userData.tel)
          }
        })
        .catch(err => {
          throw Error(err)
        })
    }

    if (status !== 'loading') {
      setLoading(true)
    }
  }, [status, session])

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value)
        break
      case 'tel':
        setTel(e.currentTarget.value)
        break
      case 'address':
        setAddress(e.currentTarget.value)
        break
      default:
    }
  }

  const handleProfileEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, image, tel, address }),
    }).then(res => {
      if (res?.ok) {
        return true
      }
      throw new Error('update Fail')
    })
    toaster(result)
  }

  const handleProfilePhotoChange = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e?.currentTarget?.files
    const file = new FormData()
    if (!files || !(files.length > 0)) {
      throw Error('No File')
    }
    file.set('file', files[0])

    const result = fetch('/api/upload', {
      method: 'POST',
      body: file,
    }).then(async res => {
      if (res?.ok) {
        const isImage = await res.json()
        setImage(isImage)
        return
      }
      throw Error('ERROR PROFILE SAVE')
    })

    toaster(result)
  }

  if (!loading) {
    return (
      <section className="w-full">
        <div className="w-full flex justify-center items-center flex-col">
          <h1 className="font-semibold my-10">LOADING...</h1>
          <Loading />
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-center font-semibold text-primary text-4xl mb-4">
        프로필
      </h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4">
          <div>
            {image && (
              <Image
                className="rounded-xl mb-4 border"
                src={image}
                width="100"
                height="100"
                objectFit="contain"
                alt="Avatar"
              />
            )}
            <label htmlFor="fileUpload">
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                onChange={handleProfilePhotoChange}
              />
              <span className="block text-center w-full border py-2 rounded-xl">
                이미지 변경
              </span>
            </label>
          </div>
          <form
            onSubmit={handleProfileEdit}
            className="flex flex-col grow justify-between "
          >
            <input
              name="name"
              type="text"
              onChange={handleInput}
              value={name}
              placeholder="이름을 입력해주세요"
            />
            <input
              type="text"
              placeholder="이메일"
              disabled
              value={userEmail}
            />
            <input
              name="tel"
              type="tel"
              onChange={handleInput}
              placeholder="전화번호"
              value={tel}
            />
            <input
              name="address"
              type="text"
              onChange={handleInput}
              placeholder="주소"
              value={address}
            />
            <button className="bg-primary py-2 rounded-xl" type="submit">
              저장하기
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
