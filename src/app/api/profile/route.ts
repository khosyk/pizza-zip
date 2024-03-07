/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { User } from '../models/User'
import { auth } from '../auth/[...nextauth]/route'

type Update = {
  name?:string
  image?:string
}

export async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGO as string)
    const data = await req.json()
    const session = await auth()
    const email = session?.user?.email

    const update:Update = {};
    if ('name' in data)update.name = data.name
    if ('image' in data)update.image = data.image
    
    if(Object.keys(update).length>0){
      console.log("HEELLOE");
      await User.updateOne({ email }, update )
      return NextResponse.json({ message: '프로필 업데이트됨' });
    }
    
    return NextResponse.json({ message: '이름 필드 누락' }), { status: 400 };
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
