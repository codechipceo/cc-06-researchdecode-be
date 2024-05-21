const mongoose=require("mongoose")

const coursesSchema=new mongoose.Schema({



})
const COURSES=new mongoose.model("courses",coursesSchema)
module.exports=COURSES;