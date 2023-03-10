import Showcase from "../mongodb/models/showcase.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//CREATE

const createShowcase = async (req, res) => {
    try {
        const { title, description, showcaseType, location, day, photo, email } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newShowcase = await Showcase.create({ title, description, showcaseType, location, day, photo: photoUrl.url, creator: user._id });

        user.allShowcases.push(newShowcase._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Showcase created successfully" });
    } catch (error) {
        res.status(500).json({ message: 'u suck' });
        console.log(error);
    }
};


// READ

const getAllShowcases = async (req, res) => {

  const { _end, _order, _start, _sort, title_like = "", showcaseType = "" } = req.query

  const query = {};

  if(title_like !== '') {
    query.title = { $regex: title_like, $options: 'i' };
  }

  if(showcaseType !== '') {
    query.showcaseType = showcaseType;
  }

  try {

    const count = await Showcase.countDocuments({query});

    const showcases = await Showcase
      .find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })

      res.header('x-total-count', count);
      res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(showcases);
  } catch (error) {
    res.status(500).json({ message: "Read Failed" })
  }
};

const getShowcaseDetail = async (req, res) => {
  const { id } = req.params;
  const showcaseExists = await Showcase.findOne({ _id: id }).populate('creator');

  if(showcaseExists) {
    res.status(200).json(showcaseExists)
  } else {
    res.status(404).json({ message: "Showcase not found" })
  }
}

// UPDATE

const updateShowcase = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, showcaseType, location, day, photo, email } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Showcase.findByIdAndUpdate({ _id: id }, {
      title,
      description,
      showcaseType,
      location,
      day,
      photo: photoUrl.url || photo
    })

    res.status(200).json({ message: "BS updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Update Failed" })
  }
};

// DELETE

const deleteShowcase = async (req, res) => {
  try {
    const { id } = req.params;
    const showcaseToDelete = await Showcase.findById({_id: id }).populate('creator')

    if(!showcaseToDelete) throw new Error('BS not Found');

    const session = await mongoose.startSession();
    session.startTransaction();

    showcaseToDelete.remove({ session });
    showcaseToDelete.creator.allShowcases.pull
    (showcaseToDelete);

    await showcaseToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "BS deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete Failed" })
  }
};

export {
    getAllShowcases,
    getShowcaseDetail,
    createShowcase,
    updateShowcase,
    deleteShowcase,
};
