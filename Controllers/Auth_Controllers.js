const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const resetLink = process.env.reset_Link;
const crypto = require("crypto");
const sendEmail = require("./Utils/sendEmail");


exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Required fields missing" });

  const hash = bcrypt.hashSync(password, 10);
  const user = new User({ username, password: hash });

  await user.save();
  res.status(201).json({ message: "User registered", data: user });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: "1hr" });
  res.json({ message: "Login successful", token });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 900000;
    await user.save();

    const resetGateway = `${resetLink}/${token}`;
    const htmlContent = `
  <h3>Password Reset Request</h3>
  <p> Click the link below to reset your Password:</p>
  <a href="${resetGateway}">Reset Password</a>

  <p>This link is valid for 1 hour only. </p>
  `;

    await sendEmail(user.username, "Reset Your Password", htmlContent);

    res.status(200).json({ message: "Reset link sent to youre email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.Resetpassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token && !password)
      return res.status(400).json({ message: "Required fields missing" });

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.status(201).json({ message: "Password reseted successully👍", data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
