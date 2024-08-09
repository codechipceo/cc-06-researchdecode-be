const cloudinary = require("cloudinary");
const CustomError = require("../Errors/CustomError");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();
class UploadFiles {
  async uploadFile(filePath, folderPath, resourceType, options = {}) {
       const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const params = {
      Bucket: "your-bucket-name", // Replace with your bucket name
      Key: `${folderPath}/${fileName}`, // Path within S3
      Body: fileContent,
      ContentType: options.contentType || "application/octet-stream", // Adjust content type based on file type
    };
    try {
      const uploadOptions = {
        folder: folderPath,
        resource_type: resourceType ?? "raw",
        ...options,
      };
      const result = await cloudinary.v2.uploader.upload(
        filePath,
        uploadOptions
      );
      return result;
    } catch (error) {
      console.log(error)
      throw new CustomError(500, error);
    }
  }
}

const uploadFileService = new UploadFiles();

module.exports = uploadFileService;
