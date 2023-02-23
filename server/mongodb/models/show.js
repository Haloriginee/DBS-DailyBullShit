import mongoose from "mongoose";

const ShowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type:String, required: true },
  day: { type: Number, required: true },
  photo: { type: String, required: true },
  showType: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const showModel = mongoose.model('Show', ShowSchema);

export default showModel;
