// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const app = express();

// const PORT = process.env.PORT || 3000;
// const MONGODB_URI = ' mongodb+srv://anszeshan786:AnsZeshan051@anscluster.ls7ac19.mongodb.net/test'; 

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
