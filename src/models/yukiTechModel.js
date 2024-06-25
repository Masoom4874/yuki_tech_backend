// yukiTechModel.js

import mongoose from "mongoose";
import { Schema } from "mongoose";

const yukiTechCertificateSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "yukiTechUser",
      required: true,
    },
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
    docName: {
      type: String,
      trim: true,
    },
    contNo: {
      type: String,
      trim: true,
    },
    cert: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const yukiTechCertificate = mongoose.model(
  "yukiTechCertificate",
  yukiTechCertificateSchema
);

export default yukiTechCertificate;
