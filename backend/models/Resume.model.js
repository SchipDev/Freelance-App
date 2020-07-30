const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const resumeSchema = new Schema(
  {
    userId: {type: String, required: true, unique: true},
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