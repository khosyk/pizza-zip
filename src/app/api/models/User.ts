import { Schema, models, model } from 'mongoose'
import bcrypt from 'bcrypt'

type User = {
  name:string
  email: string
  password: string
}

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
//8~20자 영문자or수자or특수문자 2가지 이상 조합
const passwordRegex =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/ 

const UserSchema = new Schema<User>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string)=> {
          if (!emailRegex.test(email)) {
            throw new Error('EMAIL')
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (pass: string) =>{
          if (!(pass.length > 8 && pass.length < 21))
            throw new Error('PASSWORD')
          if (!passwordRegex.test(pass)) throw new Error('PASSWORD')
        },
      },
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.post('validate', (user) => {
  const raw = user.password
  const salt = bcrypt.genSaltSync(10)
  const hashed = bcrypt.hashSync(raw, salt)
  user.password = hashed
})

export const User = models?.User || model('User', UserSchema)
