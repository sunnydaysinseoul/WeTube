import mongoose from "mongoose";
import bcrypt from "bcrypt";


const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatarUrl : { type: String },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    videos:[{type:mongoose.Schema.Types.ObjectId, ref:'Video'}],
  },
  {
    versionKey: false,
  }
);
  
  UserSchema.pre("save", async function () {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 5); //hashing 5times
  }});

  const User = mongoose.model("User",UserSchema);


  const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    // expireAt: { type: Date, default: Date.now,expires:3600 }
  }
  // , {timestamps: true}
  );

export const Token = mongoose.model("Token", tokenSchema);
// Token.schema.index({expireAt: 1},{expireAfterSeconds: 600}); //10분후 만료
export default User;
