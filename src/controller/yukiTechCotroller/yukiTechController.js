// yukiTechController.js
import yukiTechUserModel from "../../models/yuki.user.model.js";
import yukiTechCertModel from "../../models/yukiTechModel.js";

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
    const { id, docName, contNo, cert } = req.body;

    // Validate required fields
    if (!docName || !contNo || !cert) {
      return res.status(400).send({
        status: false,
        message: "All fields are required!",
      });
    }

    const UserData = await yukiTechUserModel.findById(id);

    const entryData = await yukiTechCertModel.create({
      user: id,
      empCode: UserData.empCode,
      compName: UserData.compName,
      docName: docName,
      contNo: contNo,
      cert: cert,
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
