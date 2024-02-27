import React from 'react'

type Props = {
  title: string
  subTitle: string
}

export default function SectionHeaders({ title, subTitle }: Props) {
  return (
    <div className="text-center">
      <h3 className="uppercase text-gray-500 font-semibold leading-4">
        {title}
      </h3>
      <h2 className="pb-3 text-primary font-bold text-4xl">{subTitle}</h2>
    </div>
  )
}
