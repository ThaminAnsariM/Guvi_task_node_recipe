const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

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
