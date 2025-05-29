const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret_key';

exports.register = async (req, res) => {
  const { username, password, role, name, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role, name, email });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Overenie tokenu (funguje s Bearer aj x-auth-token)
exports.verifyToken = (req, res, next) => {
  let token =
    req.header('x-auth-token') ||
    (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Získanie údajov o sebe
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Úprava svojho profilu (meno, email, heslo)
exports.updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (password) update.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.user.userId, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAdmin = async () => {
  const username = 'admin';
  const password = 'adminpassword';
  const role = 'admin';
  const name = 'Admin';
  const email = 'admin@example.com';

  try {
    let user = await User.findOne({ username });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ username, password: hashedPassword, role, name, email });
      await user.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error creating admin user:', err.message);
  }
};