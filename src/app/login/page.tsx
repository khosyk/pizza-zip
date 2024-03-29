'use client'

import { handleGoogleLogin } from '@/utils/login/providers'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useCallback, useReducer, useState } from 'react'

type ReduceState = {
  email: string
  password: string
}

type Action = {
  type: string
  payload: string
}

export default function Login() {
  const [loginProgress, setLoginProgress] = useState(false)
  const [fail, setFail] = useState(false)
  const [state, dispatch] = useReducer(
    (status: ReduceState, action: Action) => {
      switch (action.type) {
        case 'email':
          return { ...status, email: action.payload }
        case 'password':
          return { ...status, password: action.payload }
        default:
          return status
      }
    },
    { email: '', password: '' },
  )

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value })
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoginProgress(true)
      setFail(false)

      const { email, password } = state
      const res = await signIn('credentials', {
        email,
        password,
        callbackUrl: 'http://localhost:3000',
        redirect: false,
      })

      if (res?.status === 401) {
        setFail(true)
      }
    } catch (err) {
      setFail(true)
    } finally{
      setLoginProgress(false)
    }
  }

  return (
    <section className="register mt-8">
      <h1 className="text-center font-semibold text-primary text-4xl">
        로그인
      </h1>
      <form
        onSubmit={handleSubmit}
        className="block max-w-xs mx-auto mt-5"
        action=""
      >
        <input
          type="text"
          name="email"
          placeholder="이메일"
          onChange={handleInput}
          value={state.email}
          disabled={loginProgress}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleInput}
          value={state.password}
          disabled={loginProgress}
        />
        <button type="submit" disabled={loginProgress}>
          로그인
        </button>
        {fail ? (
          <div className="my-4 text-center text-primary">
            로그인 실패 다시 시도해주세요.
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
          회원이 아니신가요?
          <Link className="pl-2 hover:underline" href="/register">
            회원가입하러가기 &raquo;
          </Link>
        </div>
      </form>
    </section>
  )
}
