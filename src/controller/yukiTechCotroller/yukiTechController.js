// yukiTechController.js
import yukiTechUserModel from "../../models/yuki.user.model.js";
import yukiTechCertModel from "../../models/yukiTechModel.js";
import AWS from "aws-sdk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  region: process.env.REGION,
});

const bucketName = process.env.BUCKETNAME;

const s3 = new AWS.S3();
//check employee
export const checkempController = async (req, res) => {
  try {
    const { empCode } = req.body;
    const emp = await yukiTechUserModel.findOne({ empCode });

    if (emp) {
      res
        .status(200)
        .send({ status: true, message: "Employee found", data: emp });
    } else {
      res.send({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving employee information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create certificate entries controller
export const createCertificateEntries = async (req, res) => {
  try {
    const { id, docName, contNo } = req.body;
    const { cert } = req.files;

    // Validate required fields
    if (!docName || !contNo || !cert) {
      return res.status(400).send({
        status: false,
        message: "All fields are required!",
      });
    }

    const UserData = await yukiTechUserModel.findById(id);

    // Generate a unique key for the S3 object
    const s3Key = `yuki-tech/${Date.now()}_${docName}`;

    // Upload the certificate to S3
    const s3Response = await uploadToS3(cert, bucketName, s3Key);

    const entryData = await yukiTechCertModel.create({
      user: id,
      empCode: UserData.empCode,
      compName: UserData.compName,
      docName: docName,
      contNo: contNo,
      cert: s3Response.Location,
    });

    return res.status(200).send({
      status: true,
      message: "Certificate is Created",
    });
  } catch (error) {
    console.error("Error creating certificate entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all data admin
export const getEmpData = async (req, res) => {
  try {
    const empList = await yukiTechCertModel.find({});

    return res
      .status(200)
      .send({ status: true, message: "Employee Data retrived", data: empList });
  } catch (error) {
    console.error("Error retrieving all employee information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadToS3 = async (file, bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.data, // Assuming the file object contains a 'data' property with the file buffer
    ContentType: file.mimetype, // Get MIME type from the file object
    // ACL: "public-read",
  };
  return s3.upload(params).promise();
};
