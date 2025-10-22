const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Helper: validate file type
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

// Helper: upload a single file to Cloudinary
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//  Local file upload (optional)
exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);

    const pathToSave =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(pathToSave, (err) => {
      if (err) {
        console.error("Error saving file locally:", err);
        return res.status(500).json({
          success: false,
          message: "Error while saving file locally",
        });
      }
    });

    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during local upload",
      error: error.message,
    });
  }
};

// Cloudinary Multiple Image Upload
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log("Upload requested by:", name, tags, email);

    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    let files = req.files.imageFile;
    if (!Array.isArray(files)) files = [files];

    const supportedTypes = ["jpg", "jpeg", "png"];
    const uploadResults = [];

    for (const file of files) {
      const fileType = file.name.split(".").pop().toLowerCase();

      if (!isFileTypeSupported(fileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: `File format not supported: ${file.name}`,
        });
      }

      const response = await uploadFileToCloudinary(file, "COLLEGE_GALLERY");
      console.log("Uploaded:", response.secure_url);

      const savedFile = await File.create({
        fileName: file.name,
        cloudinaryUrl: response.secure_url,
        cloudinaryId: response.public_id,
        fileType,
        fileSize: file.size,
      });

      uploadResults.push(savedFile);
    }

    res.status(200).json({
      success: true,
      message: "All images uploaded successfully",
      uploadedFiles: uploadResults,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


//  Video file upload 
async function uploadVideoToCloudinary(file, folder) {
  const options = { folder, resource_type: "video" };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    if (!req.files || !req.files.videoFile) {
      return res.status(400).json({
        success: false,
        message: "No video file uploaded",
      });
    }

    let files = req.files.videoFile;
    if (!Array.isArray(files)) files = [files];

    const supportedTypes = ["mp4", "mov", "avi", "mkv"];
    const uploadResults = [];

    for (const file of files) {
      const fileType = file.name.split(".").pop().toLowerCase();

      if (!isFileTypeSupported(fileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: `Video format not supported: ${file.name}`,
        });
      }

      const response = await uploadVideoToCloudinary(file, "COLLEGE_GALLERY");
      console.log("Uploaded video:", response.secure_url);

      const savedFile = await File.create({
        fileName: file.name,
        cloudinaryUrl: response.secure_url,
        cloudinaryId: response.public_id,
        fileType,
        fileSize: file.size,
      });

      uploadResults.push(savedFile);
    }

    res.status(200).json({
      success: true,
      message: "All videos uploaded successfully",
      uploadedFiles: uploadResults,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during video upload",
      error: error.message,
    });
  }
};


//  Reduced / Resized Image Upload
exports.imageReducerUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    let files = req.files.imageFile;
    if (!Array.isArray(files)) files = [files];

    const supportedTypes = ["jpg", "jpeg", "png"];
    const uploadResults = [];

    // Ensure tmp directory exists
    const tempDir = path.join(__dirname, "../tmp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    for (const file of files) {
      const fileType = file.name.split(".").pop().toLowerCase();

      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({
          success: false,
          message: `File format not supported: ${file.name}`,
        });
      }

      const tempFilePath = path.join(tempDir, `${Date.now()}-${file.name}`);

      await sharp(file.tempFilePath)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toFile(tempFilePath);

      const response = await cloudinary.uploader.upload(tempFilePath, {
        folder: "COLLEGE_GALLERY",
      });

      console.log("Uploaded reduced image:", response.secure_url);

      const savedFile = await File.create({
        fileName: file.name,
        cloudinaryUrl: response.secure_url,
        cloudinaryId: response.public_id,
        fileType,
        fileSize: file.size,
      });

      uploadResults.push(savedFile);

      fs.unlinkSync(tempFilePath);
    }

    res.status(200).json({
      success: true,
      message: "Reduced images uploaded successfully",
      uploadedFiles: uploadResults,
    });
  } catch (error) {
    console.error("Reduced image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during reduced image upload",
      error: error.message,
    });
  }
};
