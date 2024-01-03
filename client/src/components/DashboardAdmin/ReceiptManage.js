import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios'; // Import Axios for API requests

const ReceiptManage = () => {
  const [recipients, setRecipients] = useState([]);
  const [recipientDetails, setRecipientDetails] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
  });
  const [viewMode, setViewMode] = useState('list'); 

  useEffect(() => {
    axios.get('http://localhost:3001/api/recipients')
      .then(response => {
        setRecipients(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipients:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientDetails({ ...recipientDetails, [name]: value });
  };
  const showSuccessMessage = (message) => {
    Swal.fire({
      text: message,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

const handleSaveRecipient = () => {
    // API call to save recipient
    if (viewMode === 'add') {
      axios.post('http://localhost:3001/api/recipients', recipientDetails)
        .then(response => {
        
          setRecipients([...recipients, recipientDetails]);
          console.log("adding,,,,, " +recipientDetails);
          showSuccessMessage('Recipient added successfully!');
        })
        .catch(error => {
          // Handle error
          console.error('Error adding recipient:', error);
        });
    } else if (viewMode === 'edit') {
      axios.put(`http://localhost:3001/api/recipients/${recipientDetails.id}`, recipientDetails)
        .then(response => {
          // Handle success
          const updatedRecipients = recipients.map(recipient =>
            recipient.id === recipientDetails.id ? recipientDetails : recipient
          );
          setRecipients(updatedRecipients);
          showSuccessMessage('Recipient details updated!');
        })
        .catch(error => {
          // Handle error
          console.error('Error updating recipient:', error);
        });
    }
    setViewMode('list');
    setRecipientDetails({ id: '', name: '', email: '', address: '' });
  };
  const handleDeleteRecipient = (id) => {
    const recipientExists = recipients.find(recipient => recipient.id === id);
  
    if (!recipientExists) {
      // If recipient doesn't exist in the frontend state, it wasn't saved in the backend, no need to delete
      showMessage('Recipient does not exist!', 'error');
      return;
    }
    // API call to delete recipient
    axios.delete(`http://localhost:3001/api/recipients/${id}`)
      .then(response => {
        // Handle success
        const updatedRecipients = recipients.filter(recipient => recipient.id !== id);
        setRecipients(updatedRecipients);
        showMessage('Recipient deleted!', 'success');
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting recipient:', error);
      });
  };

  const showMessage = (message, type) => {
    Swal.fire({
      text: message,
      icon: type,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const renderRecipientForm = () => (
    <div>
      <h2>{viewMode === 'add' ? 'Add' : 'Update'} Recipient</h2>
      
      <form>
      <input
        type="text"
        name="id"
        value={recipientDetails.id}
        placeholder="Recipient ID"
        onChange={handleInputChange}
      />
        <input
          type="text"
          name="name"
          value={recipientDetails.name}
          placeholder="Recipient Name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={recipientDetails.email}
          placeholder="Recipient Email"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          value={recipientDetails.address}
          placeholder="Recipient Address"
          onChange={handleInputChange}
        />
        <button onClick={handleSaveRecipient}>
          {viewMode === 'add' ? 'Add Recipient' : 'Update Recipient'}
        </button>
      </form>
    </div>
  );

  const renderRecipientList = () => (
    <div>
      <button className="btn btn-primary mb-3" onClick={() => setViewMode('add')}>
        Add Recipient
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((recipient) => (
            <tr key={recipient.id}>
              <td>{recipient.name}</td>
              <td>{recipient.email}</td>
              <td>{recipient.address}</td>
              <td>
                <button className="btn btn-info me-2" onClick={() => onViewRecipient(recipient)}>
                  View
                </button>
                <button className="btn btn-warning me-2" onClick={() => onEditRecipient(recipient)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteRecipient(recipient.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const onViewRecipient = (recipient) => {
    setRecipientDetails(recipient);
    setViewMode('view');
  };

  const onEditRecipient = (recipient) => {
    setRecipientDetails(recipient);
    setViewMode('edit');
  };

  const renderRecipientDetails = () => (
    <div>
      <h2>Recipient Details</h2>
      <p>Name: {recipientDetails.name}</p>
      <p>Email: {recipientDetails.email}</p>
      <p>Address: {recipientDetails.address}</p>
      <button onClick={() => setViewMode('list')}>Back</button>
    </div>
  );

  let content;
  switch (viewMode) {
    case 'list':
      content = renderRecipientList();
      break;
    case 'view':
      content = renderRecipientDetails();
      break;
    case 'edit':
    case 'add':
      content = renderRecipientForm();
      break;
    default:
      content = renderRecipientList();
  }
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return <div className="container">
    <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            List of Recipients
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar> <br/><br/><br/>
    {content}</div>;
};

export default ReceiptManage;



