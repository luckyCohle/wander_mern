const { application } = require("express");
const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description: {
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location: String, 
    country : String,
    reviews : [
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

// Create a text index on title and description fields
listingSchema.index({ title: 'text', description: 'text' });


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}})
    }
})
const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing;