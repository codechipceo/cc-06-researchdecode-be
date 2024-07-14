const cloudinary = require("cloudinary");
const CustomError = require("../Errors/CustomError");

class UploadFiles {
  async uploadFile(filePath, folderPath, resourceType, options = {}) {
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
      throw new CustomError(500, error.message);
    }
  }
}

const uploadFileService = new UploadFiles();

module.exports = uploadFileService;
