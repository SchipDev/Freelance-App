const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    jobTitle: String,
    hasResume: { type: Boolean, required: true, default: false },
    resumeId: String,
    googleId: String,
    imageUrl: String,
    phoneNum: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
