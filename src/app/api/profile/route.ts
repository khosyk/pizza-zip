/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { User } from '../models/User'
import { auth } from '../auth/[...nextauth]/route'

type DataObject = {
  name?: string
  image?: string
  tel?: string
  address?: string
}

export async function GET() {
  try {
    mongoose.connect(process.env.MONGO as string)
    const session = await auth()
    const email = session?.user?.email
    const userData = await User.findOne({ email })
    return NextResponse.json(userData);

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGO as string)
    const data: DataObject = await req.json()
    const session = await auth()
    const email = session?.user?.email

    if (Object.keys(data).length > 0) {
      await User.updateOne({ email }, data)
      return NextResponse.json({ message: '프로필 업데이트됨' });
    }

    return NextResponse.json({ message: '인풋 필드 누락' }), { status: 400 };
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}