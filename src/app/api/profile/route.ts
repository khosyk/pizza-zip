import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { User } from '../models/User'
import { auth } from '../auth/[...nextauth]/route'

export default async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGO as string)
    const data = await req.json()
    const session = await auth()
    const email = session?.user?.email
    console.log('data:::', data);
    if ('name' in data) {
      await User.updateOne({ email },  { name: data.name })
      return NextResponse.json({ message: '프로필 업데이트됨' });
    }

    return NextResponse.json({ message: '이름 필드 누락' }), { status: 400 };
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
