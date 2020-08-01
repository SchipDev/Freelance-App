const { Schema, model } = require("mongoose");

const newjobsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true
    },
    location: {
      type: [String],
      required: true
    },
    rate: {
      type: String,

      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("NewJobs", newjobsSchema);
