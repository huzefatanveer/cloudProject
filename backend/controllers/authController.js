// // controllers/authController.js
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const secretKey = 'd6daf97809ebc48bfc197e9a1721f5dba531ecb9aad8a623c0c2d95a2b52b648'; 

// async function register(req, res) {
//     try {
//       const { email, password, name, phone, skills, language } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       const user = new User({
//         email,
//         password: hashedPassword,
//         name,
//         phone,
//         skills,
//         language,
       
//       });
//       await user.save();
//         const token = jwt.sign({ id: user._id }, secretKey, {
//             expiresIn: 86400,
//         });
//         res.status(201).json({ token });
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ message: 'Registration failed' });
//     }
//   }
// async function login(req, res) {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const passwordValid = await bcrypt.compare(password, user.password);

//     if (!passwordValid) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: user._id }, secretKey, {
//       expiresIn: 86400, // 24 hours (adjust as needed)
//     });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Login failed' });
//   }
// }

// module.exports = { register, login };



const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secretKey = 'd6daf97809ebc48bfc197e9a1721f5dba531ecb9aad8a623c0c2d95a2b52b648'; 
let userIdCounter = 0;

async function register(req, res) {
    try {
        const { email, password, name, phone, skills, language } = req.body;
        userIdCounter++;

     console.log("shsh........",req.body);
        const user = new User({
            id: userIdCounter, // Assign the incremented user ID
            email,
            password, // Store the plain text password
            name,
            phone,
            skills,
            language,
        });
        console.log("controller check ,,,,,,,", user.email);
        await user.save();

        const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: 86400,
        });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Registration failed' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) { // Compare plain text passwords
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: 86400, // 24 hours (adjust as needed)
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
}



async function forgotPassword (req, res){
    const { email } = req.body;
  
    try {
      // Check if the email exists in your database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email does not exist' });
      }
  
      // Generate a new random password
      const newPassword = generateRandomPassword();
  
      // Update the user's password in the database
      user.password = newPassword;
      await user.save();
  
      // Send the new password to the user's email (you'll need an email service for this)
  
      res.status(200).json({ message: 'Password has been reset and sent to your email' });



      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Example: 'Gmail', 'Outlook', etc.
        auth: {
          user: 'anszeshan786@nu.edu.pk', // Your email address
          pass: 'AnsZeshan123@#$', // Your email password or an app-specific password
        },
      });
  
      // Email content
      const mailOptions = {
        from: 'anszeshan786@gmail.com', // Sender's email address
        to: res.email, // Recipient's email address
        subject: 'Password Reset', // Email subject
        text: `Your new password: ${newPassword}`, // Email text
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error:', error);
          res.status(500).json({ message: 'Failed to send the email.' });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Password has been reset and sent to your email' });
        }
      });


    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to reset password. Please try again.' });
    }
  };
  
  // Function to generate a random password
  function generateRandomPassword() {
    // Replace this with your own logic to generate a random password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }
module.exports = { register, login, forgotPassword };
