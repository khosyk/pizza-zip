/* eslint-disable import/prefer-default-export */
import uniqId from 'uniqid'
import { NextRequest } from 'next/server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

export async function POST(req: NextRequest) {
  const data = await req.formData()

  if (data.get('file')) {
    const file = data?.get('file')

    const s3Client = new S3Client([{
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      },
    }])

    const ext = file?.name.split('.').slice(-1)

    const newFileName = uniqId() + '.' + ext

    const chunks: File[] = []

    for await (const chunk of file?.stream()) {
      chunks.push(chunks)
    }
    const buffer = Buffer.concat(chunks);

    const bucket = 'pizzzip'
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file?.type,
      Body: buffer
    }))

    const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`
    return Response.json(link)
  }

}
