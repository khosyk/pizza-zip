import { Schema, models, model, ValidateOpts, Mixed, ValidatorProps } from "mongoose";

type User = {
  email: string;
  password: string | any;
}


const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password: string) {
        if(!password?.length || password.length < 5){
          new Error('password must be at least 5 characters');
          return false;
        }
        },
      message: function(props:ValidatorProps){return props.value}
    }
  }
}, {
  timestamps: true
})

export const User = models?.User || model('User', UserSchema)