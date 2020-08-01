const { Schema, model } = require("mongoose");

const resumeSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    summary: String, 
    skills: [String], 
    workExperience: Array , 
    education: {type: [Object], default: []}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = model("Resume", resumeSchema);