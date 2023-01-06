const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
        type: Number,
        required: true
    },
    pic: {
        type: String,
    },
    summary: {
        type: Array,
        required: true
    },
    url: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Note", noteSchema);
