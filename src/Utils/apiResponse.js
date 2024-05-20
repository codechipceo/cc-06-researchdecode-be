// Success Response function
module.exports = ({ res, msg, data, count = 0 }) => {
  return res.status(200).json({ msg: msg, data: data, count });
};
