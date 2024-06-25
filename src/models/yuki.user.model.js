// yukiTechModel.js

import mongoose from "mongoose";

const yukiTechUserSchema = new mongoose.Schema(
  {
    empCode: {
      type: String,
      required: true,
      trim: true,
    },
    compName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const yukiTechUser = mongoose.model("yukiTechUser", yukiTechUserSchema);

export default yukiTechUser;
