const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const resumeSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
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