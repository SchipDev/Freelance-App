const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: {type: String, required: true, unique: true},
    name: String,
    jobTitle: String, 
    googleId: String,
    imageUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
