import mongoose from "mongoose";
import { User } from "../models/User";
import { NextRequest } from "next/server";
// type ResponseData = {
//   message: string
// }


export async function POST(req:NextRequest){
  const body = await req.json();
  mongoose.connect(process.env.MONGO as string);
  const createdUser = await User.create(body);
  console.log('check here',createdUser);
  return Response.json(createdUser);
}