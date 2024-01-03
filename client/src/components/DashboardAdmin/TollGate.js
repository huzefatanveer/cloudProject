import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
const TollGate = () => {
  const [tollGates, setTollGates] = useState([
    { id: 1, name: 'Gate 1', location: 'Location 1', fee: '$5' },
    { id: 2, name: 'Gate 2', location: 'Location 2', fee: '$7' },
    // Add more dummy data as needed
  ]);

  const [newTollGate, setNewTollGate] = useState({
    name: '',
    location: '',
    fee: '',
  });
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleAddTollGate = () => {
    Swal.fire({
      title: 'Add New Toll Gate',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Gate Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Location">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Fee">',
      focusConfirm: false,
      preConfirm: () => {
        const gateName = document.getElementById('swal-input1').value;
        const gateLocation = document.getElementById('swal-input2').value;
        const gateFee = document.getElementById('swal-input3').value;
        if (!gateName || !gateLocation || !gateFee) {
          Swal.showValidationMessage('Please fill in all fields');
        }
        return { name: gateName, location: gateLocation, fee: gateFee };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newGateWithId = {
          ...result.value,
          id: tollGates.length + 1,
        };
        setTollGates([...tollGates, newGateWithId]);
        Swal.fire('Success!', 'New toll gate added!', 'success');
      }
    });
  };
  const handleUpdateSubmit = () => {
    // const updatedGates = tollGates.map((gate) =>
    //   gate.id === selectedTollGate.id ? selectedTollGate : gate
    // );
    // setTollGates(updatedGates);
    // setIsUpdateModalOpen(false);
    Swal.fire('Success!', 'Toll gate updated!', 'success');
  };

  const handleDeleteTollGate = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this toll gate entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedGates = tollGates.filter((gate) => gate.id !== id);
        setTollGates(updatedGates);
        Swal.fire('Deleted!', 'Your toll gate has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="App">
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
         Toll Gate Management
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar> <br/><br/><br/>
      <h1>Toll Gates </h1>
      <button className="btn btn-primary mb-3" onClick={handleAddTollGate}>
        Add Toll Gate
      </button>
      <h2>List All Toll Gates</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tollGates.map((gate) => (
            <tr key={gate.id}>
              <td>{gate.id}</td>
              <td>{gate.name}</td>
              <td>{gate.location}</td>
              <td>{gate.fee}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => handleDeleteTollGate(gate.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success btn-sm mr-2"
                  onClick={() => handleUpdateSubmit(gate.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TollGate;
