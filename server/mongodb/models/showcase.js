import mongoose from "mongoose";

const ShowcaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type:String, required: true },
  day: { type: Number, required: true },
  photo: { type: String, required: true },
  showcaseType: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const showcaseModel = mongoose.model('Showcase', ShowcaseSchema);

export default showcaseModel;
