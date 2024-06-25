import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import yukiTechRoutes from "./src/routes/yukiTechRoutes.js";

const app = express();
const port = 3000;

// MongoDB connection
const dbUrl =
  "mongodb+srv://mongomasoom:MongoMasoom@cluster0.jrqbcbi.mongodb.net/CertificatesDatabase";

// Middlewares
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  fileUpload({ createParentPath: true, limits: { fileSize: 50 * 1024 * 1024 } })
);

// Routes
app.use("/api/v1/yuki", yukiTechRoutes);

// Status route
app.get("/status", (req, res) =>
  res
    .status(200)
    .send({ status: true, message: `Server running on port ${port}` })
);

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
