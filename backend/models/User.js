const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    jobTitle: String,
    hasResume: { type: Boolean, default: false },
    resumeId: String,
    googleId: String,
    image: String,
    phoneNum: {
      type: String
    }, 
    connections: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
