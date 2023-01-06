import mongoose from "mongoose";

const Product = mongoose.Schema({
    sku:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    quantity_label:{
        type: String,
        required: true,
        default: 'pcs'
    },
    stocks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stocks"
    }],
    retail_price:{
        type: Number,
        required: true,
        default: 0
    }
})

export default mongoose.model('Products', Product);