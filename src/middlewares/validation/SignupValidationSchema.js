const { checkSchema } = require("express-validator");

const studentValidationSchema = checkSchema({
  firstName: {
    notEmpty: {
      errorMessage: "First name is required",
    },
    trim: true,
    isString: {
      errorMessage: "First name must be a string",
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: "Last name is required",
    },
    trim: true,
    isString: {
      errorMessage: "Last name must be a string",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Invalid email address",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
    trim: true,
    toLowerCase: true,
  },
  emailVerified: {
    isBoolean: {
      errorMessage: "Email verified must be a boolean",
    },
    optional: true,
  },
  userType: {
    isIn: {
      options: [["BOT", "USER"]],
      errorMessage: "User type must be either 'BOT' or 'USER'",
    },
    optional: true,
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  phoneNumber: {
    notEmpty: {
      errorMessage: "Phone number is required",
    },
    isString: {
      errorMessage: "Phone number must be a string",
    },
  },
  points: {
    isInt: {
      options: { min: 0 },
      errorMessage: "Points must be a positive integer",
    },
    optional: true,
  },
  "address.street": {
    notEmpty: {
      errorMessage: "Street address is required",
    },
    isString: {
      errorMessage: "Street must be a string",
    },
  },
  "address.city": {
    notEmpty: {
      errorMessage: "City is required",
    },
    isString: {
      errorMessage: "City must be a string",
    },
  },
  "address.state": {
    notEmpty: {
      errorMessage: "State is required",
    },
    isString: {
      errorMessage: "State must be a string",
    },
  },
  "address.country": {
    notEmpty: {
      errorMessage: "Country is required",
    },
    isString: {
      errorMessage: "Country must be a string",
    },
  },
  "address.postalCode": {
    notEmpty: {
      errorMessage: "Postal code is required",
    },
    isPostalCode: {
      options: "any",
      errorMessage: "Invalid postal code",
    },
  },
  isActive: {
    isBoolean: {
      errorMessage: "Active status must be a boolean",
    },
    optional: true,
  },
  isDelete: {
    isBoolean: {
      errorMessage: "Delete status must be a boolean",
    },
    optional: true,
  },
});

module.exports = studentValidationSchema;
