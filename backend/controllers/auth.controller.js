
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// async function register(call, callback) {
//   const { name, email, password } = call.request;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log(`User already exists: ${email}`);
//       return callback(null, { message: 'User already exists' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password.trim(), salt);
//     console.log('Hashed Password (Registration):', hashedPassword);  // Debugging line

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();
//     console.log(`User registered successfully: ${name}, ${email}`);
//     callback(null, { message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     callback(err, null);
//   }
// }

// // Login function
// async function login(call, callback) {
//   const { email, password } = call.request;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log(`User not found: ${email}`);
//       return callback(null, { message: 'User not found' });
//     }

//     // Log the password entered during login
//     console.log('Entered Password (Login):', password.trim());

//     // Log the stored hashed password
//     console.log('Stored Hashed Password (Login):', user.password);

//     // Compare the hashed password with the entered password
//     const isMatch = await bcrypt.compare(password.trim(), user.password);
//     console.log('Password Match Result:', isMatch);  // Debugging line

//     if (!isMatch) {
//       return callback(null, { message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
//     console.log('JWT Token:', token);  // Debugging line
//     callback(null, { token, message: 'Login successful' });
//   } catch (err) {
//     console.error('Error during login:', err);
//     callback(err, null);
//   }
// }
// module.exports={register,login};


// Register function
async function register(call, callback) {
  const { name, email, password } = call.request;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User already exists: ${email}`);
      return callback(null, { message: 'User already exists' });
    }

    // Trim the password and hash it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);
    console.log('Hashed Password (Registration):', hashedPassword);  // Debugging line

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log(`User registered successfully: ${name}, ${email}`);
    callback(null, { message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    callback(err, null);
  }
}


// Login function
async function login(call, callback) {
  const { email, password } = call.request;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`);
      return callback(null, { message: 'User not found' });
    }

    // Trim the entered password to avoid extra spaces
    const trimmedPassword = password.trim();

    // Log the password entered during login for debugging
    console.log('Entered Password (Login):', trimmedPassword);

    // Log the stored hashed password for debugging
    console.log('Stored Hashed Password (Login):', user.password);

    // Compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log('Password Match Result:', isMatch);  // Debugging line

    if (!isMatch) {
      return callback(null, { message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    console.log('JWT Token:', token);  // Debugging line
    callback(null, { token, message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    callback(err, null);
  }
}


module.exports = { register, login };

