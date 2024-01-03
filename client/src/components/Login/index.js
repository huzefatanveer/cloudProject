import React, { useState } from 'react';
import SideBox from './../Generic/SideBox'
import { Link, Navigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import Cook from 'js-cookie';
import { useDispatch } from 'react-redux'
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from '../Dashboard/Sidebar';
import Navbar from '../Dashboard/Navbar';
const LoginForm=() => {
  const Cookies=Cook.withAttributes( {
    path: '/', 
    sameSite: 'Strict', 
    secure: true
  } )

  const dispatch=useDispatch();
  // const history = useHistory();

  const [ form ]=Form.useForm();
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("admin credentials,,,,,,,,,,", values.email);
    console.log("admin credentials,,,,,,,,,,", values.password);

    if(values.email === "admin@gmail.com" && values.password === "adminlogin") {
      message.error('Login Succesfully as Admin');

      navigate('/admindashboard')
    }
    else{
    setLoading(true); // Set loading to true during the request
    try {
     
      const response = await axios.post('http://localhost:3001/api/auth/login', values); // Send a POST request to the login route
      if (response.status === 200) {
        message.success('Successfully Logged In as User');
        form.resetFields();
           navigate('/dashboard');
          
        
     
  
      } else {
        message.error('Login failed');
      }
    
    } catch (error) {
      console.error('Error during login:', error);
      message.error('Login failed');
    } finally {
      setLoading(false); // Set loading back to false after the request
    }
  
  };
  }
  //  const onFinish=async values => {
  //      message.success('Successfully Logged In');
  //      form.resetFields();
  //  }

  const onFinishFailed=errorInfo => {
    console.log( 'Failed:', errorInfo )
  }
  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='hidden md:block md:w-6/12'>
          <SideBox
            image='loginIll.png'
            width='320px'
            imageClass={'w-7/12 mt-28 mb-12'}
          />
        </div>

        <div className='w-full md:w-6/12 flex justify-center'>
          <div className='w-full lg:w-8/12 2xl:w-8/12'>
            <div className='px-3 mt-20'>
              <div className='form_top_content'>
                 <div className="services_bg ml-80">
                            <img
                                className=""
                                src={require("./../../img/Group 1669.png")}
                                alt=""
                                style={{ width: "100%", height: "100%" }}
                            />
                   </div>
                <div className='justify-center'>
                   
                  <h1 className='text-3xl font-medium text-center'>
                    Welcome Back
                  </h1>
                  <p className='text-center'>
                    Please enter your account details to login into Zaah Toll.
                  </p>
                  <h1 className='text-3xl font-medium text-center'>
                    Login 
                  </h1>
                </div>

                <div className='mt-20'>
                  <Form
                    name='basic'
                    layout='vertical'
                    initialValues={{
                      remember: true
                    }}
                     onFinish={onFinish}
                    autoComplete='on'
                  >
                    <Form.Item
                      label='Email'
                      name='email'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                          type: "email"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label='Password'
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!'
                        }
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                     <div className='mt-3 check_input'>
                       
                      <div className='w-100 text-end'>
                        <Link
                          to='/forget-password'
                          className='text-blue-500 hover:text-blue-500'
                          onClick={handleForgotPassword}
                        >
                          Forgot Password
                        </Link>
                      </div>
                    </div>
                    <Form.Item
                    >  <br/>
                      <Button
                        style={{ height: '2.5rem' }}
                        size='small'
                        className='btn create_account_btn w-100 '
                        htmlType='submit'
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>

            <div className='move_signup text-center mt-5'>
              <p>
                Don't have an account?
                <Link to='/signup/user' className='ms-2 inline_link'>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default LoginForm
