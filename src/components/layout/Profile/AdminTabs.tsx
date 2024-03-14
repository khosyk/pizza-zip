import Link from 'next/link'
import React from 'react'

export default function AdminTabs() {
  return (
    <div className="tabs flex gap-2 mb-4 ml-4">
      <Link href="/profile">프로필</Link>
      <Link href="/category">카테고리</Link>
      <Link href="/menu">메뉴</Link>
      <Link href="/users">사용자</Link>
    </div>
  )
}
