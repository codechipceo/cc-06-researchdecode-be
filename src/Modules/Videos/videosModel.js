const mongoose=require("mongoose")

const videoSchema=new mongoose.Schema({



})
const VIDEOS=new mongoose.model("video",videoSchema)
module.exports=VIDEOS;