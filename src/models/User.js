import mongoose from "mongoose";
import bcrypt from "bcrypt";


const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
  });
  
  UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5); //hashing 5times
  });

  const User = mongoose.model("User",UserSchema);

export default User;
