import mongoose from "mongoose";

const Transaction = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    staff:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
})

export default mongoose.model('Transactions', Transaction);