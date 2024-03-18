import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter user firstname"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter user lastname"],
    },
    owner: {
        type: Boolean,
        required: true,
    },
    username: {
        type: String,
        required: [true, "Please enter user username"],
    },
    email: {
        type: String,
        required: [true, "Please enter user email"],
    },
    password: {
        type: String,
        required: [true, "Please enter user password"],
    },
    birthDate: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
