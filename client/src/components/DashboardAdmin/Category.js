
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
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
import axios from 'axios'; // Import Axios for API requests

const Category = () => {
  // Dummy data for vehicle categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Car', description: 'Standard four-wheeled vehicle' },
    { id: 2, name: 'Truck', description: 'Large transport vehicle' },
  ]);
 // Function to fetch categories from the backend
 useEffect(() => {
    axios.get('http://localhost:3001/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  // State for new category input
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // Function to handle form submission for adding a new category
  const handleAddCategory = () => {
    // Use SweetAlert to prompt a form
    Swal.fire({
      title: 'Add New Category',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Category Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Category Description">',
      focusConfirm: false,
      preConfirm: () => {
        const categoryName = document.getElementById('swal-input1').value;
        const categoryDescription = document.getElementById('swal-input2').value;
        if (!categoryName || !categoryDescription) {
          Swal.showValidationMessage('Please fill in both fields');
        }
        return { name: categoryName, description: categoryDescription };
      },
    }).then((result) => {
        if (result.isConfirmed) {
          axios.post('http://localhost:3001/api/categories', result.value)
            .then(response => {
              setCategories([...categories, { ...result.value, id: categories.length + 1 }]);
              Swal.fire('Success!', 'New category added!', 'success');
            })
            .catch(error => {
              console.error('Error adding category:', error);
            });
        }
      });
  };

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/api/categories/${id}`)
          .then(response => {
            const updatedCategories = categories.filter(category => category.id !== id);
            setCategories(updatedCategories);
            Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
          })
          .catch(error => {
            console.error('Error deleting category:', error);
            Swal.fire('Error!', 'Failed to delete category.', 'error');
          });
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
            List of Categories
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar> <br/><br/><br/>
        <br/>
      <br/>
      <button className="btn btn-primary mb-3" onClick={handleAddCategory}>
        Add Category
      </button>
      <br/><br/>
    {/* Table to display all categories */}
    <h2>List All Categories</h2>
    <br/>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
