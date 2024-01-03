const Pass = require('../models/Pass');

const passController = {
  getPasses: async (req, res) => {
    try {
      const passes = await Pass.find();
      res.json(passes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addPass: async (req, res) => {
    try {
      const newPass = new Pass(req.body);
      await newPass.save();
      res.json({ message: 'Pass added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePass: async (req, res) => {
    const customPassId = req.params.id;
    const { dateCreated, passCode, owner, category, toll, cost } = req.body;
    try {
      // Find the pass by the custom id
      const pass = await Pass.findOne({ id: customPassId });

      if (!pass) {
        return res.status(404).json({ error: 'Pass not found' });
      }

      // Update the pass information
      pass.dateCreated = dateCreated;
      pass.passCode = passCode;
      pass.owner = owner;
      pass.category = category;
      pass.toll = toll;
      pass.cost = cost;

      // Save the updated pass
      const updatedPass = await pass.save();

      res.json(updatedPass);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  },
 
  deletePass: async (req, res) => {
    
    try {
        const { id } = req.params.id;
    
      await Pass.findByIdAndDelete({id});
      res.status(204).send();
      res.json({ message: 'Pass deleted successfully' });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = passController;
