import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { mainListItems, secondaryListItems } from '../DashboardAdmin/listItems';  // Import the Sidebar components
import { Navbar } from '../DashboardAdmin/Navbar';  // Import the Navbar component
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch the list of users from your API
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
   
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => editUser(record)}>Edit</Button>
          <Button onClick={() => deleteUser(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const addUser = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

  const onFinish = (values) => {
    if (editingUser) {
      // Update an existing user
      axios.put(`http://localhost:3001/api/users/${editingUser.id}`, values)
        .then((response) => {
          const updatedUsers = users.map((user) =>
            user.id === editingUser.id ? response.data : user
          );
          message.success('User updated successfully');
          setUsers(updatedUsers);
          handleCancel();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          message.error('Failed to update user');
        });
    } else {
      // Add a new user
      axios.post('http://localhost:3001/api/users', values)
        .then((response) => {
          setUsers([...users, response.data]);
          message.success('User added successfully');
          handleCancel();
        })
        .catch((error) => {
          console.error('Error adding user:', error);
          message.error('Failed to add user');
        });
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:3001/api/users/${userId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        message.success('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        message.error('Failed to delete user');
      });
  };
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    
    <div>
        {/* <Navbar />  
        <div style={{ display: 'flex' }}>
        <List>{mainListItems}</List>  
        <div style={{ flexGrow: 1, marginLeft: '20px' }}>
          <Button type="primary" onClick={addUser}>
            Add User
          </Button>
          <Table columns={columns} dataSource={users} rowKey="id" />
        </div>
      </div> */}

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
            User Management
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <br/><br/><br/>
      {/* <Button
            type="primary"
            onClick={addUser}
            style={{display: 'block', margin: '0 auto' }}
            >
            Add User
       </Button> */}

      
      <br/><br/>
      <Table columns={columns} dataSource={users} rowKey="id" />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
         {/* <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: 'Please enter ID' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter an email' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
