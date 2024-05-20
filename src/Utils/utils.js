const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authtoken;

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedUser;

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const checkAccess = (requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.userId.permissions;
    console.log(req.user)
    
    const hasPermission = userPermissions.includes(requiredPermissions);
    if (!hasPermission) {
      return res.status(401).json({ msg: "Access Denied" });
    }
    next();
  };
};

module.exports = { hashPassword, comparePasswords, generateToken, verifyToken , checkAccess };
