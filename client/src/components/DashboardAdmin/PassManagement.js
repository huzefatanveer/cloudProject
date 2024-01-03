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
import axios from 'axios';

const PassManagement = () => {
  const [passes, setPasses] = useState([]);
  const [passDetails, setPassDetails] = useState({
    id: '',
    dateCreated: '',
    passCode: '',
    owner: '',
    category: '',
    toll: '',
    cost: '',
  });
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    axios.get('http://localhost:3001/api/passes')
      .then(response => {
        setPasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching passes:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassDetails({ ...passDetails, [name]: value });
  };

  const showSuccessMessage = (message) => {
    Swal.fire({
      text: message,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleSavePass = () => {
    if (viewMode === 'add') {
      axios.post('http://localhost:3001/api/passes', passDetails)
        .then(response => {
          setPasses([...passes, passDetails]);
          showSuccessMessage('Pass added successfully!');
        })
        .catch(error => {
          console.error('Error adding pass:', error);
        });
    } else if (viewMode === 'edit') {
      axios.put(`http://localhost:3001/api/passes/${passDetails.id}`, passDetails)
        .then(response => {
          const updatedPasses = passes.map(pass =>
            pass.id === passDetails.id ? passDetails : pass
          );
          setPasses(updatedPasses);
          showSuccessMessage('Pass details updated!');
        })
        .catch(error => {
          console.error('Error updating pass:', error);
        });
    }
    setViewMode('list');
    setPassDetails({
      id: '',
      dateCreated: '',
      passCode: '',
      owner: '',
      category: '',
      toll: '',
      cost: '',
    });
  };

  const handleDeletePass = (id) => {
    const passExists = passes.find(pass => pass.id === id);
  
    if (!passExists) {
      // If pass doesn't exist in the frontend state, it wasn't saved in the backend, no need to delete
      showMessage('Pass does not exist!', 'error');
      return;
    }
    
    // API call to delete pass
    axios.delete(`http://localhost:3001/api/passes/${id}`)
      .then(response => {
        // Handle success
        const updatedPasses = passes.filter(pass => pass.id !== id);
        setPasses(updatedPasses);
        showSuccessMessage('Pass deleted!');
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting pass:', error);
      });
  };
  
//   const handleDeletePass = (id) => {
//     const updatedPasses = passes.filter((pass) => pass.id !== id);
//     setPasses(updatedPasses);
//     showSuccessMessage('Pass deleted!');
//   };

  const showMessage = (message, type) => {
    Swal.fire({
      text: message,
      icon: type,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const renderPassForm = () => {
    if (viewMode === 'add' || viewMode === 'edit') {
      return (
        <div>
          <h2>{viewMode === 'add' ? 'Add' : 'Update'} Pass</h2>
          <form>
          <input
        type="text"
        name="id"
        value={passDetails.id}
        placeholder="Pass ID"
        onChange={handleInputChange}
      />
            <input
              type="text"
              name="dateCreated"
              value={passDetails.dateCreated}
              placeholder="Date Created"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="passCode"
              value={passDetails.passCode}
              placeholder="Pass Code"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="owner"
              value={passDetails.owner}
              placeholder="Owner"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              value={passDetails.category}
              placeholder="Category"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="toll"
              value={passDetails.toll}
              placeholder="Toll"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cost"
              value={passDetails.cost}
              placeholder="Cost"
              onChange={handleInputChange}
            />
            <button onClick={handleSavePass}>
              {viewMode === 'add' ? 'Add Pass' : 'Update Pass'}
            </button>
          </form>
        </div>
      );
    }
    return null;
  };

  const renderPassList = () => (
    <div>
      <button className="btn btn-primary mb-3" onClick={() => setViewMode('add')}>
        Add Pass
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Date Created</th>
            <th>Pass Code</th>
            <th>Owner</th>
            <th>Category</th>
            <th>Toll</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passes.map((pass) => (
            <tr key={pass.id}>
              <td>{pass.dateCreated}</td>
              <td>{pass.passCode}</td>
              <td>{pass.owner}</td>
              <td>{pass.category}</td>
              <td>{pass.toll}</td>
              <td>{pass.cost}</td>
              <td>
                <button className="btn btn-info me-2" onClick={() => onViewPass(pass)}>
                  View
                </button>
                <button className="btn btn-warning me-2" onClick={() => onEditPass(pass)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeletePass(pass.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const onViewPass = (pass) => {
    setPassDetails(pass);
    setViewMode('view');
  };

  const onEditPass = (pass) => {
    setPassDetails(pass);
    setViewMode('edit');
  };

  const renderPassDetails = () => (
    <div>
      <h2>Pass Details</h2>
      <p>Date Created: {passDetails.dateCreated}</p>
      <p>Pass Code: {passDetails.passCode}</p>
      <p>Owner: {passDetails.owner}</p>
      <p>Category: {passDetails.category}</p>
      <p>Toll: {passDetails.toll}</p>
      <p>Cost: {passDetails.cost}</p>
      <button onClick={() => setViewMode('list')}>Back</button>
    </div>
  );
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  let content;
  switch (viewMode) {
    case 'list':
      content = renderPassList();
      break;
    case 'view':
      content = renderPassDetails();
      break;
    case 'edit':
    case 'add':
      content = renderPassForm();
      break;
    default:
      content = renderPassList();
  }

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
            List of Passes 
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

export default PassManagement;

