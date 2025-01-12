const { check } = require("express-validator");

const consultancyCardValidationSchema = [
  check("teacherId")
    .notEmpty()
    .withMessage("Teacher ID is required")
    .isMongoId()
    .withMessage("Teacher ID must be a valid MongoDB ObjectId"),
  
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  
  check("pricing.single")
    .optional()
    .isString()
    .withMessage("Pricing for single must be a string"),
  
  check("pricing.project")
    .optional()
    .isString()
    .withMessage("Pricing for project must be a string"),
  
  check("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  
  check("isDelete")
    .optional()
    .isBoolean()
    .withMessage("isDelete must be a boolean"),
];

module.exports = consultancyCardValidationSchema;
