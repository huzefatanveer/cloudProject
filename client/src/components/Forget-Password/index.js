// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Form, Input, Button , message} from 'antd';
// import SideBox from './../Generic/SideBox';
// import { useNavigate } from "react-router-dom";

// const ForgotPasswordPage = () => {
//     const navigate = useNavigate();

//   const onFinish = (values) => {
//     // Handle the forgot password logic here
//     message.success('Password has been reset and sent to your email');
//     console.log('Form values:', values);
//     navigate("/login");
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);

//   };

//   return (
//     <>
    
//       {/* {contextHolder} */}
//       <div className='flex flex-wrap'>
//         <div className='hidden md:block md:w-6/12'>
//           <SideBox image='illustrations2.png' imageClass='w-9/12' />
//         </div>

//         <div className='w-full md:w-6/12 flex justify-center'>
//           <div className='w-full lg:w-8/12 2xl:w-8/12'>
//             <div className='px-3 mt-20'>
//               <div className='form_top_content'>
//                 <div className='justify-center'>
//                   <h1 className='text-3xl font-medium text-center'>
//                   Forgot Password</h1>
//                <p className="text-center">Enter your email address to reset your password.
//                   </p>
//                 </div>

//                 <div className='mt-20'>
//                   <Form
//                     // form={form}
//                     name='basic'
//                     layout='vertical'
//                     initialValues={{
//                       remember: true
//                     }}
//                     onFinish={onFinish}
//                     // onFinishFailed={onFinishFailed}
//                     autoComplete='on'
//                   >
//                     <Form.Item
//                       label='Email'
//                       name='email'
//                       rules={[
//                         {
//                           required: true,
//                           message: 'Please input your email!',
//                           type: "email"
//                         }
//                       ]}
//                     >
//                       <Input />
//                     </Form.Item>

                    
                    
                    
//                     <Form.Item
//                     >
//                       <Button
//                         style={{ height: '2.5rem' }}
//                         size='small'
//                         className='btn create_account_btn w-100'
//                         htmlType='submit'
//                       >
//                         Reset Password
//                       </Button>
//                     </Form.Item>
//                   </Form>
//                 </div>
//               </div>
//             </div>

//             <div className='move_signup text-center mt-5'>
//               <p>
//                Remember your Password ?
//                 <Link to='/login' className='ms-2 inline_link'>
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div></>
//   );
// };

// export default ForgotPasswordPage;


import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import SideBox from './../Generic/SideBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:3001/api/auth/forgot-password', {
        email: values.email,
      });
  
      // Handle the response
      if (response.status === 200) {
        message.success('Password has been reset and sent to your email');
        navigate('/login');
      } else {
        console.error('Error:', response.data);
        message.error('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to reset password. Please try again.');
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
                    image='forgot.png'
                    width='320px'
                    imageClass={'w-7/12 mt-28 mb-12'}
                />
         </div>
        <div className='w-full md:w-6/12 flex justify-center'>
          <div className='w-full lg:w-8/12 2xl:w-8/12'>
            <div className='px-3 mt-20'>
              <div className='form_top_content'>
                <div className='justify-center'>
                <div className="services_bg ml-80">
                            <img
                                className=""
                                src={require("./../../img/Group 1669.png")}
                                alt=""
                                style={{ width: "100%", height: "100%" }}
                            />
                   </div>
                  <h1 className='text-3xl font-medium text-center'>Forgot Password</h1>
                  <p className='text-center'>Enter your email address to reset your password.</p>
                </div>

                <div className='mt-20'>
                  <Form
                    name='forgot-password'
                    layout='vertical'
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='on'
                  >
                    <Form.Item
                      label='Email'
                      name='email'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                          type: 'email',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        style={{ height: '2.5rem' }}
                        size='small'
                        className='btn create_account_btn w-100'
                        htmlType='submit'
                      >
                        Reset Password
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>

            <div className='move_signup text-center mt-5'>
              <p>
                Remember your Password?{' '}
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

export default ForgotPasswordPage;