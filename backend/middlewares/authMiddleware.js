// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const secretKey = 'd6daf97809ebc48bfc197e9a1721f5dba531ecb9aad8a623c0c2d95a2b52b648'; 

// function verifyToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Failed to authenticate token' });
//     }

//     req.userId = decoded.id;
//     next();
//   });
// }
// function authMiddleware(req, res, next) {
//     const token = req.header('x-auth-token');
  
//     if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
//     try {
//       const decoded = jwt.verify(token, secretKey);
//       req.user = decoded;
//       next();
//     } catch (ex) {
//       res.status(400).json({ message: 'Invalid token.' });
//     }
//   }

// module.exports = verifyToken;



// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'd6daf97809ebc48bfc197e9a1721f5dba531ecb9aad8a623c0c2d95a2b52b648'; // Replace with your own secret key

function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = authMiddleware;
