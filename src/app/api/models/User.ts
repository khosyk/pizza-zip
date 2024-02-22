import { Schema, models, model,} from "mongoose";
import bcrypt from 'bcrypt';

type User = {
  email: string;
  password: string;
}

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const UserSchema = new Schema<User>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate:{
      validator: function(email:string){
        if(!emailRegex.test(email)){
          throw new Error('EMAIL');
        }
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: { 
      validator: function(pass:string) { //커스텀 벨리데이터 작성
        if(!(pass.length > 8 && pass.length < 21))throw new Error('PASSWORD') //false 인 경우 아래 메시지와 함께 500 에러
      }
    },
  }
}, {
  timestamps: true
})

UserSchema.post('validate', (user)=>{
  const raw = user.password;
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(raw, salt);
  user.password = hashed;
})

export const User = models?.User || model('User', UserSchema)