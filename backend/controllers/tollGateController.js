const TollGate = require('../models/TollGate');

const tollGateController = {
  getTollGates: async (req, res) => {
    try {
      const tollGates = await TollGate.find();
      res.json(tollGates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addTollGate: async (req, res) => {
    try {
      const newTollGate = new TollGate(req.body);
      await newTollGate.save();
      res.json({ message: 'Toll gate added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTollGate: async (req, res) => {
    try {
      const { id } = req.params;
      await TollGate.findByIdAndDelete(id);
      res.json({ message: 'Toll gate deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = tollGateController;
