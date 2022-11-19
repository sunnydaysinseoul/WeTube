import mongoose from "mongoose";
import bcrypt from "bcrypt";


const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean },
});
  
  UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5); //hashing 5times
  });

  const User = mongoose.model("User",UserSchema);


  const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 1800 } }
});

export const Token = mongoose.model("Token", tokenSchema);

export default User;
