import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    isVerified: {
        default : false,
        type: Boolean
    },
    isAdmin: {
        default : false,
        type: Boolean
    },

    forgotPassowrdToken: String,
    forgotPassowrdTokenExpiry: Date,
    verifyToken: String,
    verifyTokenTokenExpiry: Date,


})


const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User