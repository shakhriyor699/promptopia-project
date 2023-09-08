import { Schema, model, models } from "mongoose";


interface IUserSchema {
  email: {
    type: string,
    required: boolean
    unique: [boolean, string]
  }
  username: {
    type: string,
    required: boolean,
    match: RegExp
  },
  image: string
}

const UserSchema = new Schema<IUserSchema>({
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: true,
    match: [/^(?=.{8,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"] 
  },
  image: {
    type: String
  }
}, { timestamps: true })

const User = models.User || model("User", UserSchema);
export default User