import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const DogSchema = mongoose.Schema({
  chipNumber: {
    type: String,
    required: [true, "Please enter dog chip number"],
  },
  owner: {
    type: ObjectId,
    required: true
  },
  identification: {
    type: Object,
    required: true,
  },
  health: {
    type: Object,
    required: true,
  },
  feed: {
    type: Object,
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
  education: {
    type: Object,
    required: true,
  }
});

const Dog = mongoose.model("Dog", DogSchema);

export default Dog;
