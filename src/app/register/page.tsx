'use client'

import { handleGoogleLogin } from '@/utils/login/providers'
import Image from 'next/image'
import Link from 'next/link'
import React, { useReducer, useState } from 'react'

interface ReducerState {
  email: string
  password: string
}

interface ReducerAction {
  type: string
  payload: string
}

export default function Register() {
  const [creatingUser, setCreatingUser] = useState(false)
  const [userCreated, setUserCreated] = useState(false)
  // register errorCase
  const [duplicate, setDuplicate] = useState(false)
  const [format, setFormat] = useState(false)
  const [other, setOther] = useState(false)

  const [state, dispatch] = useReducer(
    (reducerState: ReducerState, reducerAction: ReducerAction) => {
      switch (reducerAction.type) {
        case 'email':
          return { ...reducerState, email: reducerAction.payload }
        case 'password':
          return { ...reducerState, password: reducerAction.payload }
        default:
          return reducerState
      }
    },
    { email: '', password: '' },
  )

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setCreatingUser(true)
      setUserCreated(false)
      setDuplicate(false)
      setFormat(false)
      setOther(false)
      const { ok, statusText } = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!ok) {
        if (statusText.includes('duplicate')) throw Error('duplicate')
        if (statusText.includes('email')) throw Error('email')
        if (statusText.includes('password')) throw Error('password')
        throw Error('else')
      }
      setCreatingUser(false)
      setUserCreated(true)
    } catch (err) {
      setCreatingUser(false)
      if (err instanceof Error) {
        const { message } = err
        if (message.includes('duplicate')) setDuplicate(true)
        if (message.includes('email') || message.includes('password'))
          setFormat(true)
        if (message.includes('else')) setOther(true)
      }
    }
  }

  return (
    <section className="register mt-8">
      <h1 className="text-center font-semibold text-primary text-4xl">
        회원가입
      </h1>
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-5">
        <input
          type="text"
          name="email"
          placeholder="이메일"
          onChange={handleInput}
          value={state.email}
          disabled={creatingUser}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleInput}
          value={state.password}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          회원가입
        </button>
        {userCreated && (
          <div className="my-4 text-center">
            회원가입 완료!
            <br />
            <Link className="hover:underline" href="/login">
              로그인하기 &raquo;
            </Link>
          </div>
        )}
        {duplicate ? (
          <div className="my-4 text-center text-primary">
            이미 가입된 계정입니다.
          </div>
        ) : null}
        {format ? (
          <div className="my-4 text-center text-primary">
            이메일 또는 패스워드를 확인해주세요.
            <br />
            영문자 + 숫자 또는 특수문자 포함 8~20자
          </div>
        ) : null}
        {other ? (
          <div className="my-4 text-center text-primary">
            에러 발생, 잠시후 다시 시도해주세요.
          </div>
        ) : null}
        <div className="my-4 text-center text-gray-500">
          또는 아래 방법으로 로그인
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex justify-center gap-4"
        >
          <Image src="/google.png" alt="googleLogo" width={24} height={24} />
          구글 로그인
        </button>
        <div className="my-6 text-center pt-5  border-t text-gray-500">
          이미 회원이신가요?
          <Link className="pl-2 hover:underline" href="/login">
            로그인하기 &raquo;
          </Link>
        </div>
      </form>
    </section>
  )
}
