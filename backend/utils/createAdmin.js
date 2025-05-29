const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = new User({
        username: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      await newAdmin.save();
      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (err) {
    console.error('❌ Error creating admin user:', err.message);
  }
};

module.exports = createAdminUser;
