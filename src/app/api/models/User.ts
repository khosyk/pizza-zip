import { Schema, models, model } from 'mongoose'
import bcrypt from 'bcrypt'

type UserProps = {
  name: string
  email: string
  password: string
  image: string
  tel: string
  address: string
  admin: boolean
}

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/

const UserSchema = new Schema<UserProps>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => {
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
        validator: (pass: string) => {
          if (!(pass.length > 8 && pass.length < 21))
            throw new Error('PASSWORD')
          if (!passwordRegex.test(pass)) throw new Error('PASSWORD')
        },
      },
    },
    image: {
      type: String
    },
    tel: {
      type: String
    },
    address: {
      type: String
    },
    admin: {
      type: Boolean, default: false
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

// eslint-disable-next-line import/prefer-default-export
export const User = models?.User || model('User', UserSchema)
