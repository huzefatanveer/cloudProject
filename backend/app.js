const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipientRoutes = require('./routes/recipientRoutes');
const passRoutes = require('./routes/passRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tollGateRoutes = require('./routes/tollGateRoutes');

const nodemailer = require('nodemailer');
const app = express();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb+srv://anszeshan786:AnsZeshan051@anscluster.ls7ac19.mongodb.net/test';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const reports = {
  'Daily Pass Report': [
    { id: 1, date: '2023-01-01', totalPasses: 50, revenue: '$500' },
    { id: 2, date: '2023-01-02', totalPasses: 65, revenue: '$600' },
  ],
};
mongoose.set('strictQuery', false); 

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', authRoutes);
app.use('/api', recipientRoutes);
app.use('/api', passRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tollGateRoutes);
// Route for generating reports
app.post('/api/generate-report', (req, res) => {
  const { reportType } = req.body;
  const generatedReport = reports[reportType] || [];

  res.json(generatedReport);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
