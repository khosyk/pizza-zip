import React from 'react'
import SectionHeaders from './SectionHeaders'

type Props = {}

export default function HomeAbout({}: Props) {
  return (
    <section className='text-center py-10'>
    <SectionHeaders title='망설임은' subTitle="피자만 식게할뿐" />
    <p className='text-gray-500 py-5'>
      피자는 역시 피자집에서<br/>
      피자집 전화번호는 아래에서
    </p>
    <span className='text-2xl text-gray-600 '>
      전화){' '}
    </span>
    <a className='text-4xl' href="tel:0212345678">
      02-1234-5678
    </a>
    </section>
  )
}