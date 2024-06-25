import express from "express";
import {
  createCertificateEntries,
  checkempController,
  getEmpData,
} from "../controller/yukiTechCotroller/yukiTechController.js";

const router = express.Router();

// Check employee route
router.post("/check-emp", checkempController);

// Create certificate entries route
router.post("/create-cert", createCertificateEntries);

//getting All data in Admin Panel
router.get("/get-emp-data", getEmpData);

export default router;
