const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  webinarCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
    require: true
  },
  webinarTitle: {
    type: String,
    required: true,
    trim: true,
  },
  WebinarBanner:{
    type: String,
    required: true,
    trim: true
  },
  webinarDate: {
    type: String,
    required: true,
    trim: true,
  },
  webinarTime: {
    type: String,
    required: true,
    trim: true,
  },
  webinarSpeaker: {
    type: String,
    trim: true,
  },
  webinarSponsor: {
    type: String,
    trim: true,
  },
  webinarLocation: {
    type: String,
    trim: true,
  },
  webinarMode: {
    type: String,
    required: true,
    trim: true,
  },
  webinarDescription: {
    type: String,
    required: true,
    trim: true,
  },
});

const webinarRegistration = new mongoose.Schema({
  webinarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Webinar",
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    require: true,
  },
});

const WebinarModel = new mongoose.model("Webinar", webinarSchema);
const WebinarRegistrationModel = new mongoose.model(
  "WebinarRegistration",
  webinarRegistration
);

module.exports = { WebinarModel, WebinarRegistrationModel };
