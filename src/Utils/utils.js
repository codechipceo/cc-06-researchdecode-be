const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}

const generateToken = (userId) => {
  const { _id, firstName, userType } = userId;
  console.log(_id);
  
  const payload = {
    _id,
    firstName,
    userType,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
};

const generateAdminToken = (adminObj) => {
  const { _id, role, name, username, email } = adminObj;
  const payload = {
    _id,
    role,
    name,
    username,
    email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.decodedUser = decodedUser;

    console.log("Decoded user in verifyToken:", decodedUser); 

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token has expired" });
    }
    return res.status(401).json({ msg: "Token verification failed" });
  }
};




const checkAccess = (requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.userId.permissions;
    const hasPermission = userPermissions.includes(requiredPermissions);
    if (!hasPermission) {
      return res.status(401).json({ msg: "Access Denied" });
    }
    next();
  };
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
  checkAccess,
  generateAdminToken,
};
