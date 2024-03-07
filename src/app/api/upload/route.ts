/* eslint-disable import/prefer-default-export */
import { NextRequest } from 'next/server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import uniqid from 'uniqid';

export async function POST(req: NextRequest) {
  const data = await req.formData()

  if (data.get('file')) {
    const file = data?.get('file')

    const s3Client = new S3Client({
      region: 'ap-northeast-2',
      credentials:{
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
      }
    })

    let ext:string = '.png'
    if (file instanceof File) {
      ext = file?.name.split('.').slice(-1)[0]

    // eslint-disable-next-line prefer-template
    const newFileName = uniqid() + '.' + ext

    const chunks: File[] = []
    for await(let chunk of file.stream()) {
      chunks.push(chunk)
    }

    const buffer = Buffer.concat(chunks);

    const bucket = 'pizzazip'
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file?.type,
      Body: buffer
    }))

    const link = `https://pizzazip.s3.amazonaws.com/${newFileName}`
    return Response.json(link)
    
    }
  }
  return Response.json(true)
}
