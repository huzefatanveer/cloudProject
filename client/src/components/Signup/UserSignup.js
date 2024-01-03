import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBox from '../Generic/SideBox';
import { Col, Input, Radio, Row, Select, Upload } from 'antd';
import './../Generic/credForm.css';
import { Link } from 'react-router-dom';
import { Form, Button, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios'; // Import Axios

const { Option } = Select;

const UserSignup = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [countries, setCountries] = useState(null);
  const interest = ['Ecommerce', 'Store Manipulation', 'Sale purchase'];

  const validatePasswordLength = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters');
    }
    return Promise.resolve();
  };
  useEffect(() => {
    // fetch('https://api.example.com/countries')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setCountries(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
  }, []); 
  const onImgChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values) => {
    
      const formData = new FormData();
      // formData.append('photo', fileList[0].originFileObj);
      formData.append('email', values.email);
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('password', values.password);
      formData.append('passwordConfirm', values.passwordConfirm);
      formData.append('skills', values.skills);
      formData.append('language', values.language);
        console.log("ans,,,,,,,,,,,", values);
      // Make the POST request to your backend API
      try {
        const response = await axios.post('http://localhost:3001/api/auth/register', values);
    
        if (response.status === 201) {
          message.success('User has successfully created an Account');
          form.resetFields();
          navigate('/login');
        } else {
          if (response.status === 500 && response.data.code === 11000) {
            message.error('Email is already registered. Please use a different email address.');
          } else {
            console.log("ans,,,,,,,,,,,", values);
            message.error('Registration failed');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        message.error('Registration failed');
      }
    
    };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='hidden md:block md:w-6/12'>
          <SideBox
            image='SignUp.png'
            width='320px'
            imageClass={'w-7/12 mt-28 mb-12'}
          />
        </div>

        <div className='w-full md:w-6/12 flex justify-center'>
          <div className='w-full lg:w-10/12 2xl:w-8/12'>
            <div className='ps-4 pe-4 mt-1'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-3xl font-medium text-center'>
                    Create User Account
                  </h1>
                  <p className='text-center'>
                    Please provide all the required information.
                  </p>
                </div>

                <div className='mt-10 signup-form-fields pe-4'>
                    <Form
                      name='basic'
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete='on'
                    >
                      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <ImgCrop rotationSlider={true}>
                           <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onImgChange}
                            onPreview={onPreview}
                            beforeUpload={() => false}
                          >
                            {fileList.length < 1 && '+ Profile'}
                          </Upload>
                        </ImgCrop>
                      </div>
                      <Row>
                         <Col span={11}>
                          <Form.Item
                            name='email'
                            rules={[
                              {
                                required: true,
                                type: 'email'
                              }
                            ]}
                          >
                            <Input placeholder='Enter email' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='name'
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Full name!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter full name' />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='phone'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter Phone no' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          
                        </Col>
                      </Row>

                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='password'
                            rules={[
                              {
                                required: true,
                                validator: validatePasswordLength
                              }
                            ]}
                          >
                            <Input.Password placeholder='Enter Password' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='passwordConfirm'
                            dependencies={[ 'password' ]}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: 'Please confirm your password!'
                              },
                              ( { getFieldValue } ) => ( {
                                validator( _, value ) {
                                  if ( !value||getFieldValue( 'password' )===value ) {
                                    return Promise.resolve()
                                  }
                                  return Promise.reject(
                                    new Error(
                                      'The two passwords that you entered do not match!'
                                    )
                                  )
                                }
                              } )
                            ]}
                          >
                            <Input.Password placeholder='Enter Confirm Password' />
                          </Form.Item>
                        </Col>
                      </Row>

                      <h5>Skill and Languages:</h5>
                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='skills'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter skills e.g. Engineer, electrition..' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='language'
                            rules={[
                              {
                                required: true,
                                message: 'Please languages!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter languages English, Urdu...' />
                          </Form.Item>
                        </Col>
                      </Row>

                                
                     <Form.Item>
                        <Button
                          style={{ height: '2.5rem' }}
                          size='small'
                          className='btn create_account_btn w-100'
                          type='primary'
                          htmlType='submit'
                        >
                          Create Account
                        </Button>
                      </Form.Item>
                    </Form>
            
                </div>
              </div>
            </div>

            <div className='move_login text-center' style={{ fontSize: '12px' }}>
              <p>
                Already have an account?
                <Link to='/login' className='ms-2 inline_link'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
