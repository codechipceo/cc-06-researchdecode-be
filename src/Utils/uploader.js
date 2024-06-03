class Uploader {
    constructor(storage) {
      this.upload = storage;
    }
  
    // Middleware to handle single file upload
    single(fieldName) {
      return this.upload.single(fieldName);
    }
  
    // Middleware to handle multiple file uploads
    array(fieldName, maxCount) {
      return this.upload.array(fieldName, maxCount);
    }
  
    // Middleware to handle mixed file uploads (array of files for different fields)
    fields(fields) {
      return this.upload.fields(fields);
    }
  }
  
  module.exports = Uploader;