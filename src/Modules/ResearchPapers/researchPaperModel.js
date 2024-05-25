const mongoose = require("mongoose")

const researchPaperSchema = new mongoose.Schema({
    title: {

    },
    DOI_number: {

    },
    description: {

    },
    fileUrl: {

    }
})
const RESEARCHPAPER=new mongoose.model("ResearchPaper",researchPaperSchema)
module.exports=RESEARCHPAPER;