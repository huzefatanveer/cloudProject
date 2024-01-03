const User = require('./../models/User');

exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Add a new user
  exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
 // Update user details
exports.updateUser = async (req, res) => {
    const customUserId = req.params.id;
    const { name, email, password } = req.body;
    try {
      // Find the user by the custom id
      const user = await User.findOne({ id: customUserId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user's information
      user.name = name;
      user.email = email;
      user.password = password;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  // Delete a user
  exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findOneAndRemove({ id: userId });
        res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };