import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  allShow: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;
