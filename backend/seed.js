const mongoose = require('mongoose');
const User = require('./models/User'); // Assuming your user model is in 'models/User.js'

const MONGODB_URI = 'mongodb+srv://anszeshan786:AnsZeshan051@anscluster.ls7ac19.mongodb.net/test';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);

const dummyUser = {
  email: 'user1@example.com',
  password: 'password123', // You should hash the password before storing it in production
};

async function seedDummyUser() {
  try {
    await User.create(dummyUser);
    console.log('Dummy user added to the database');
  } catch (error) {
    console.error('Error seeding dummy user:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDummyUser();
