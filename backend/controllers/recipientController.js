const Recipient = require('../models/Recipient');

const recipientController = {
  getRecipients: async (req, res) => {
    try {
      const recipients = await Recipient.find();
      res.json(recipients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addRecipient: async (req, res) => {
    try {
      const { id, name, email, address } = req.body;
      console.log("body adding,,,  ", +res.body);
      const newRecipient = new Recipient({ id, name, email, address });
      await newRecipient.save();
      res.json({ message: 'Recipient added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRecipient: async (req, res) => {
    const customReceiptId = req.params.id;
    const { name, email, address } = req.body;
    try {
      // Find the receipt by the custom id
      const receipt = await Recipient.findOne({ id: customReceiptId });
  
      if (!receipt) {
        return res.status(404).json({ error: 'Receipt not found' });
      }
  
      // Update the receipt's information
      receipt.name = name;
      receipt.email = email;
      receipt.address = address;
  
      // Save the updated receipt
      const updatedReceipt = await receipt.save();
  
      res.json(updatedReceipt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteRecipient: async (req, res) => {
    const receiptId = req.params.id;
    try {
         await Recipient.findOneAndRemove({ id: receiptId });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  }
};

module.exports = recipientController;
