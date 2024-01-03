import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import jwt_decode from "jwt-decode"; // You need a library to decode JWT tokens

import axios from 'axios';

const ProfileManagementPage = () => {
  const [userData, setUserData] = useState({});
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
        
      const decoded = jwt_decode(token);
      setUserId(decoded.userId);
       // Fetch user data from the API
       console.log("profile...........", userId);
      axios.get(`http://localhost:3001/api/users/${userId}`).then((response) => {
      setUserData(response.data);
      form.setFieldsValue(response.data); // Set initial form values
    })
    .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    } else {
      // Handle the case where the user is not authenticated
    }
  
   
  }, [form]);

  const onFinish = (values) => {
    // Update user data
    axios.put(`http://localhost:3001/api/users/${userData._id}`, values)
      .then(() => {
        message.success('User data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        message.error('User data update failed');
      });
  };

  return (
    <div>
      <h1>Profile Management</h1>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileManagementPage;
