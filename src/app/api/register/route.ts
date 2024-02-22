import mongoose from "mongoose";
import { User } from "../models/User";
import { NextRequest, NextResponse } from "next/server";
// type ResponseData = {
//   message: string
// }


export async function POST(req:NextRequest){
  try{
    const body = await req.json();
    mongoose.connect(process.env.MONGO as string);
    const createdUser = await User.create(body);
    // console.log('check here',createdUser);
    return NextResponse.json({message:'eee'});
  }catch(err:any){
    if(err.message.includes('EMAIL'))return NextResponse.json({}, {status:500, statusText:"EMAIL ERROR"});
    
    if(err.message.includes('PASSWORD'))return NextResponse.json({}, {status:500,statusText:"PASSWORD ERROR"});
    return NextResponse.json({}, {status:500,statusText:err.message})
    }
}