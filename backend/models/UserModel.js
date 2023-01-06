import mongoose from "mongoose";

const User = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password_hashed:{
        type: String,
        required: true
    },
    password_salt:{
        type: String,
        required: true
    },
    //0 admin 1 staff
    role:{
        type: Number,
        required: true
    }
})

export default mongoose.model('Users', User);