
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function register(call, callback) {
  const { name, email, password } = call.request;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User already exists: ${email}`);
      return callback(null, { message: 'User already exists' });
    }
    //we are hashing this in userSchema
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    console.log('Saved Hashed Password:', user.password);
    callback(null, { message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    callback(err, null);
  }
}



async function login(call, callback) {
  const { email, password } = call.request;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`user not fuond: ${email}`);
      return callback(null, { message: 'ser not found' });
    }
    console.log("hashed password(login)",user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match Result:', isMatch);

    if (!isMatch) {
      return callback(null, { message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'A89G8y2yczJelkqj', { expiresIn: '1h' });
    console.log('JWT Token:', token);
    callback(null, { token, message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    callback(err, null);
  }
}


module.exports = { register, login };

