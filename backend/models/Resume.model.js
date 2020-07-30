const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const resumeSchema = new Schema(
  {
    email: {type: String, required: true},
    summary: String, 
    skills: [String], 
    workExperience: [Object], 
    education: [Object]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

resumeSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("Resume", resumeSchema);