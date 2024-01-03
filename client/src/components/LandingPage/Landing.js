import React, { useEffect, useState } from "react";
import "./landingPage.css";
import { Link } from "react-scroll";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
// import { useState } from 'react';
import Testimonial from "./Testimonial";
import Slider from "./Slider";

const Landing = () => {
  const navigate = useNavigate();
  const [showJob, setShowJob] = useState(false)
  const [activeLink, setActiveLink] = useState(null);
  const words = ["Operations", "Management", "Innovation"];
  const [wordIndex, setWordIndex] = useState(0);

  const [faqs, setFaqs] = useState([
    {
      heading: "How does our Toll Plaza Management System work?",
      content:
        "Our Toll Plaza Management System operates by seamlessly integrating with existing toll infrastructure. It optimizes traffic flow, enhances security measures, and streamlines toll collection processes. Utilizing innovative technology, it ensures a smoother experience for both toll operators and commuters.",
      shown: false,
    },
    {
      heading: "What sets our System apart?",
      content:
        "Our system stands out due to its intelligent integration capabilities and user-friendly interface. It effortlessly synchronizes with various toll systems and offers a comprehensive dashboard for effective monitoring and management. Its intuitive design simplifies the entire toll plaza operation.",
      shown: false,
    },
    {
      heading: "Is our System suitable for different toll plaza needs?",
      content:
        "Absolutely! Our Toll Plaza Management System is versatile and adaptable. It caters to diverse toll plaza requirements, including managing toll rates, traffic analysis, financial reporting, and optimizing toll collection strategies. It's a complete solution for modern toll management.",
      shown: false,
    },
  ]);

  const changeNavbar = () => {
    $(document).ready(function () {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 200) {
          $(".custom_nav").addClass("shadow");
        } else {
          $(".custom_nav").removeClass("shadow");
        }
      });
    });
  };


  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToSignUp = () => {
    navigate("/signup/user");
  };

  // const moveToDashboard = () => {
  //   navigate("/dashboard/home");
  // };

  useEffect(() => {
    changeNavbar();
    const intervalId = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);
    return () => clearInterval(intervalId);

  }, []);

  const cardsContent = [
    {
      img: "./../../img/stt.png",
      heading: "Enhanced Security Measures",
      description:
        "Implement robust security features to ensure the safety and integrity of your toll plaza operations. Our system utilizes state-of-the-art technology to safeguard transactions, prevent fraudulent activities, and enhance overall security for both toll operators and commuters."
    },
    {
      img: "./../../img/stt.png",
      heading: "Efficient Traffic Flow Management",
      description:
        "Optimize traffic flow within the toll plaza using intelligent algorithms and real-time data analysis. Our system strategically manages vehicle queues, minimizes congestion, and enhances the overall traffic management process, ensuring smoother and faster throughput for commuters."
    },
    {
      img: "./../../img/stt.png",
      heading: "Comprehensive Analytics Dashboard",
      description:
        "Provide a comprehensive analytics dashboard that offers insights into toll plaza performance, traffic patterns, revenue analysis, and more. Our system's analytics empower toll operators with actionable data to make informed decisions and streamline toll collection strategies."
    },
  ];

  const containerStyles = {
    gap: '1.5rem',
    background: '#4161df',
    padding: '4rem',
    borderRadius: '10px',
    border: '6px solid #5d77d6',
    textAlign: 'center',
  };

  const primaryTextStyles = {
    color: '#fff',
    fontWeight: 700,
    fontSize: 50,
  };

  const secondaryTextStyles = {
    color: '#ffffff96',
  };

  return (
    <>
      {
        //************  NAVBAR **************
      }
      <nav className="bg-white custom_nav border-gray-200 px-5 sm:px-4 py-2.5 fixed top-0 left-0 right-0 border-1 border-gray-100 dark:bg-gray-800 z-30">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link
            className="bg-white"
            style={{ backgroundColor: "#ffffff" }}
            to="home"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
          >
            <img
              src={require("./../../img/toll1nav.png")}
              style={{ width: "150px", height: "50px" }}
              className="w-50"
              alt="lOGO"
            />
          </Link>

          <div className="flex md:order-2">
            <button
              style={{ border: 'none' }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-0"
              onClick={moveToLogin}
            >
              {" "}
              Login
            </button>


            <button
              style={{ border: 'none' }}
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-4"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul style={{ listStyleType: 'none' }} className="flex flex-col mt-4 md:flex-row md:space-x-2 md:mt-0 md:text-lge md:font-medium">
              <li>
                <Link
                  className={`block py-2 px-3 rounded md:bg-white md:p-0 ${activeLink === 'home' ? 'text-blue-700' : 'text-gray-600'}`}
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={0}
                  onClick={() => { setShowJob(false); setActiveLink('home'); }}
                  style={{ textDecoration: 'none' }}
                >
                  Home
                </Link>

              </li>

              <li></li>
              <li>
                <Link
                  className={`block py-2 px-3 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 ${activeLink === 'Solutions' ? 'text-blue-700' : 'text-gray-700'}`}
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={0}
                  onClick={() => { setShowJob(false); setActiveLink('Solutions'); }}
                  style={{ textDecoration: 'none' }}
                >
                  Experiences
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 px-3 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 ${activeLink === 'About Us' ? 'text-blue-700' : 'text-gray-700'}`}
                  to="about_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={0}
                  onClick={() => { setShowJob(false); setActiveLink('About Us'); }}
                  style={{ textDecoration: 'none' }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 px-3 rounded border-gray-100 hover:bg-gray-50 md:bg-white md:border-0 ${activeLink === 'FAQs' ? 'text-blue-700' : 'text-gray-700'}`}
                  to="faq_section"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={0}
                  onClick={() => { setShowJob(false); setActiveLink('FAQs'); }}
                  style={{ textDecoration: 'none' }}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2  px-3 text-gray-700 rounded border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  to="contact_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={0}

                  onClick={() => { setShowJob(false) }}
                  style={{ textDecoration: 'none' }} // Add this style

                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {
        //************  LANDING CONTENT **************
      }
      {<div>
        <div className="left_black_img">
          <img
            src={require("./../../img/Group 61.png")}
            alt=""
            style={{ width: "50%", height: "80%" }}
          />
        </div>

        <div className="mt-24" id="home">

          <div className="gap-3 flex flex-wrap w-full">
            <div className="services_bg ml-80">
              <img
                className=""
                src={require("./../../img/Group 1669.png")}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="pl-3 md:pt-20 md:w-6/12 xl:pl-36 xl:pt-36 2xl:pl-44 2xl:pt-44">

              <h2 className="text-3xl 2xl:text-6xl font-bold lg:w-9/12 xl:w-9/12 xl:text-4xl 2xl:text-5xl">
                Empower your <span className="highlight">{words[wordIndex]}</span> <br /> in Toll Plaza
              </h2>
              <p className="text-gray-500 text-lg xl:text-xl 2xl:text-2xl font-medium w-75 xl:w-7/12 2xl:w-6/12">
                where dynamic TPS meets the magic, enabling you to streamline traffic flow, enhance security measures, and optimize toll collection processes.
              </p>
              <div className="mt-4">
                <button
                  style={{ border: 'none' }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={moveToSignUp}
                >
                  Get Started
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                <Link
                  className="contact_btn mx-3 font-medium text-blue-800 hover:text-blue-800"
                  //to="contact_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                >
                  Try for Free
                </Link>
              </div>
            </div>
            <div className="hidden w-5/12 md:block ">
              <div className="w-full">
                <br /> <br /> <br />  <br />  <br />
                <img
                  src={"https://3dwarehouse.sketchup.com/warehouse/v1.0/publiccontent/4127ba88-e90b-4c62-aeed-077d3719b7ab"}
                  className="img-fluid  rounded-image"
                  alt="landing img"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center hidden">
            <div className="flex justify-content-around logos_card my-5 text-white w-8/12">
              <div className="logo">
                <img
                  src={require("./../../img/05.png")}
                  className=""
                  style={{ width: "100%", height: "100%" }}
                  alt="FLEX"
                />
              </div>
              <div className="logo">
                <img
                  src={require("./../../img/03.png")}
                  className=""
                  style={{ width: "100%", height: "100%" }}
                  alt="FLEX"
                />
              </div>
              <div className="logo">
                <img
                  src={require("./../../img/01.png")}
                  className=""
                  style={{ width: "100%", height: "100%" }}
                  alt="FLEX"
                />
              </div>
              <div className="logo">
                <img
                  src={require("./../../img/04.png")}
                  className=""
                  style={{ width: "100%", height: "100%" }}
                  alt="FLEX"
                />
              </div>
              <div className="logo">
                <img
                  src={require("./../../img/02.png")}
                  className=""
                  style={{ width: "100%", height: "100%" }}
                  alt="FLEX"
                />
              </div>
            </div>
          </div>

        </div>
        <br /><br /><br /><br /><br />
        {
          //************  ARCHI SECTION **************
        }

        <div
          id="services"
          style={{
            backgroundColor: 'rgb(242 245 249)',
            width: '100%',
            alignContent: 'center',
            height: '360px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="right_black_img">
            <img
              src={require('./../../img/Group 1667.png')}
              alt=""
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div id="section2" className="w-100">
            <div className="flex justify-center text-center text-4xl font-semibold">
              <div className="2xl:w-3/12">
                <span style={{ color: '#4E79CF' }}>Transform</span> Your{' '}
                <span style={{ color: '#4E79CF' }}>Toll Plaza</span> Experience
              </div>
            </div>
            <div className="flex text-center my-20">
              <div className="w-100 gap-3 flex flex-wrap justify-center xl:space-x-5 2xl:space-x-24">
                <div style={{ fontSize: '20px', flex: '1', textAlign: 'center' }}>
                  <img
                    src={require('./../../img/design.png')}
                    alt="Design"
                    style={{
                      width: '80px', // Adjust the size as needed
                      height: '80px', // Adjust the size as needed
                      borderRadius: '50%', // Rounded shape
                      marginBottom: '10px', // Spacing between the image and text
                    }}
                  /><br />
                  <span style={{ fontSize: '20px' }}>
                    <strong>Efficient Design</strong>
                    <br /> Streamline toll plaza architecture and layouts for optimal traffic flow.
                  </span>
                </div>
                <div style={{ fontSize: '20px', flex: '1', textAlign: 'center' }}>
                  <img
                    src={require('./../../img/rocket.png')}
                    alt="Launch"
                    style={{
                      width: '80px', // Adjust the size as needed
                      height: '80px', // Adjust the size as needed
                      borderRadius: '50%', // Rounded shape
                      marginBottom: '10px', // Spacing between the image and text
                    }}
                  /> <br />
                  <span style={{ fontSize: '20px' }}>
                    <strong>Rapid Deployment</strong>
                    <br /> Implement toll management solutions swiftly, reducing operational downtime.
                  </span>
                </div>
                <div style={{ fontSize: '20px', flex: '1', textAlign: 'center' }}>
                  <img
                    src={require('./../../img/scale.png')}
                    alt="Scale"
                    style={{
                      width: '80px', // Adjust the size as needed
                      height: '80px', // Adjust the size as needed
                      borderRadius: '50%', // Rounded shape
                      marginBottom: '10px', // Spacing between the image and text
                    }}
                  /><br />
                  <span style={{ fontSize: '20px' }}>
                    <strong>Effortless Scaling</strong>
                    <br /> Expand toll plaza services seamlessly without infrastructure concerns.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br /><br /><br />
        </div>

        {
          //************  SERVICE SECTION **************
        }

        <div id="services">
          <div className="left_black_img">
            <img
              src={require("./../../img/Group 61.png")}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="right_black_img">
            <img
              src={require("./../../img/Group 1667.png")}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div id="section2" className="w-100">
            <div className="flex justify-center text-center text-4xl font-semibold">
              <div className=" 2xl:w-3/12">
                <span style={{ color: "#4E79CF" }}>Efficiently </span> Manage Toll Operations{" "}
                <span style={{ color: "#4E79CF" }}>with Ease</span>
              </div>
            </div>
            <div className="flex text-center my-28">
              <div className="services_bg ml-80">
                <img
                  className=""

                  src={require("./../../img/Group 1669.png")}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="w-100 gap-3 flex flex-wrap justify-center xl:space-x-16 2xl:space-x-24">
                {cardsContent.map((el, i) => (
                  <div key={i} className="">
                    {" "}
                    <Card
                      img={el.img}
                      heading={el.heading}
                      description={el.description}
                    />{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <Slider/> */}
        <Testimonial />

        {
          //************  About SECTION **************
        }
        <div className="candidate_div" id="about_us" style={{ marginTop: "40px", paddingTop: "20px" }}>
          <div className="container">
            <div id="section3">
              <div className="justify-center text-center text-4xl font-semibold">
                <div className="text-6xl font-semibold 2xl:w-3/12 " style={{ marginLeft: "100px" }} >
                  <span style={{ color: "#4E79CF" }}>About </span>Us{" "}
                </div>
              </div>
              <br /><br /><br />
              <div className="flex flex-wrap md:gap-0 md:justify-between">
                <div className="md:w-2/4 md:mt-20">
                  <img
                    src={require("./../../img/toll.jpg")}
                    alt="About Us"
                    style={{ width: "90%", height: "110%", marginTop: "-20px", marginLeft: "-10px" }}

                  />
                </div>

                <div className="md:w-6/12 text-justify text-xl text-gray-600 font-normal">
                  <strong><span>Welcome to our Platform!</span></strong>
                  <br />
                  We're a team dedicated to revolutionizing toll plaza operations with innovative technology. Our platform, built on the latest tech stacks, offers a customizable solution tailored to your toll management needs.
                  Using our intuitive interface, you can seamlessly optimize traffic flow, enhance security measures, and streamline toll collection processes. Real-time insights from integrated analytics provide a comprehensive overview of toll plaza performance.
                  Whether you're a toll operator, commuter, or administrator, our platform provides versatile functionalities such as toll rate management, traffic analysis, financial reporting, and automated alerts.
                  Join us on this journey to redefine toll plaza management. We're here to simplify the tolling experience and elevate efficiency on the road.
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
        <div className="inner-container" style={containerStyles}>
          <span className="primaryText" style={primaryTextStyles}>
            Get started with our ZAAH Toll Services
          </span>
          <br /><br />
          <span className="secondaryText" style={secondaryTextStyles}>
            Welcome to our ZAAH Toll, the ultimate solution for optimizing toll operations. Subscribe now to access exclusive features that enhance traffic management, security, and toll collection efficiency. Upgrade your toll plaza experience today!
            <br />Discover seamless toll management
          </span>
          <br /><br />
          <div className="col-7 submit_div">
            <button
              style={{ border: 'none' }} className="btn btn-primary " type="submit"
              onClick={moveToSignUp}
            >
              Get Started
            </button>
          </div>
        </div>

        {
          //Frequently ask questions
        }
        <div className="w-100 mt-52" id="faq_section" style={{ marginTop: "120px" }}>

          <div className="flex justify-center text-center fw-bold fs-2">

            <div className="2xl:w-4/12">

              <div className="text-4xl font-semibold"  >
                <span>
                  Frequently Asked{" "}
                  <span style={{ color: "#4E79CF" }}>Questions</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-20">
            <div className="w-6/12">
              {faqs.map((item, index) => {
                return (
                  <div
                    key={index}
                    id={`accordion-flush-${index}`}
                    className="border-b border-gray-200 py-4"
                    data-accordion="collapse"
                    data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    data-inactive-classes="text-gray-500 dark:text-gray-400"
                  >
                    <h2 id={`accordion-flush-heading-${index}`}>
                      <button
                        type="button"
                        className={`flex justify-between items-center py-2 w-full font-medium text-left ${item.shown === false ? "text-gray-500" : "text-gray-500"
                          } border-gray-200`}
                        data-accordion-target="#accordion-flush-body-1"
                        aria-expanded="true"
                        aria-controls={`accordion-flush-body-${index}`}
                        style={{ border: 'none', backgroundColor: 'white', fontWeight: '300' }}
                        onClick={() => {
                          let newFaqs = [...faqs];
                          faqs[index].shown = !faqs[index].shown;
                          setFaqs(newFaqs);
                        }}
                      >
                        <span className="font-semibold text-xl">
                          {item.heading}
                        </span>
                        <svg
                          data-accordion-icon
                          className={`w-6 h-6 ${item.shown === true ? "rotate-180" : ""
                            } shrink-0`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </h2>
                    <div
                      id={`accordion-flush-body-${index}`}
                      className={`${item.shown === true ? "" : "hidden"} pb-3`}
                      aria-labelledby={`accordion-flush-heading-${index}`}
                    >
                      <div className="py-2 dark:border-gray-700" style={{ backgroundColor: 'rgb(242 245 249)' }}>
                        <p className="mb-2 font-medium text-gray-500 dark:text-gray-400 text-justify">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <Footer/> */}


        {
          //************  CONTACT US **************
        }
        <div className="contact_us" id="contact_us" style={{ marginTop: "140px" }}>
          <div className="flex flex-wrap justify-between p-4">
            <div className="text-white lg:w-5/12 xl:w-4/12 2xl:w-3/12">
              <h1 className="text-white text-xl font-bold lg:text-4xl lg:pt-20 2xl:pt-36 2xl:text-5xl" style={{ textAlign: "center" }}>
                Contact Us
              </h1>
              <br /><br /><br />
              <p className="text-white text-sm font-normal text-justify" style={{ textAlign: "center" }}>
                If you have any questions or need assistance, please don't hesitate to reach out to us. Our dedicated team is here to provide
                you with prompt support and help you with anything you require. We aim to respond within minutes to ensure you have a seamless experience.
              </p>
            </div>
            <div className="contact_us_right lg:w-6/12 2xl:pt-36">
              <form className="row">
                <div className="col-12">
                  <input type="text" id="firstName" placeholder="First name" required />
                </div>
                <div className="col-12">
                  <input type="text" id="lastName" placeholder="Last name" required />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    id="emailAddress"
                    placeholder="Email Address"
                    required />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Your message here!"
                    defaultValue={""}
                    required />
                </div>
                <div className="col-11 submit_div">
                  <button
                    style={{ border: 'none' }} className="btn btn-primary " type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>



      </div>}


      {
        //Need to be updated - padding, color, alignment, more links to be added,  navigations., proper look like web engine design.
        //************  FOOTER **************
      }
      <footer className="text-lg-start" >
        <div className="text-md-start flex justify-center  pb-30" style={{ backgroundColor: 'rgb(242 245 249)', marginTop: "-200px" }}>
          <br />  <br />
          {/* Grid row */}
          <div className="gap-10 flex justify-center  flex-wrap">
            <br />  <br />
            {/* Grid column */}
            <div className="ml-4 mb-4 w-72 2xl:ml-64">
              <br />  <br />

              <p className="pt-4 text-justify text-gray-500">
                Welcome to our Toll Plaza Management System app - designed to streamline traffic flow,
                enhance security, and optimize toll collection processes. Whether you're a toll operator or a commuter,
                our app aims to revolutionize your experience on the road.

              </p>
              <div className="pt-3">
                <span style={{ marginBottom: "0rem !important" }}>
                  <strong>Phone </strong>
                  <br />
                </span>
                {/* <p className="font-medium text-lg">+923326101627</p> */}<div>
                  &nbsp;&nbsp;&nbsp;&nbsp;<a classname="font-medium text-lg text-gray-800 hover:text-gray-800 cursor-pointer" href="tel:+923326101627">+923326101627  </a>
                  <br />
                  <br />
                </div>
                <div style={{ marginBottom: "0rem !important" }}>
                  <strong>  Email Address </strong>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    className="font-medium text-lg text-gray-800 hover:text-gray-800 cursor-pointer"
                    href="mailto:anszeshan786@gmail.com"
                  >
                    zaahToll@gmail.com
                  </a>
                </div>
              </div>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="w-6/12 ml-4 gap-10 flex flex-wrap md:justify-center">
              <br />  <br />
              {/* Links */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <br />  <br />
                <span className="text-2xl font-bold">Navigations</span>
                <div className="pt-2">
                  <div className="text-lg pt-2">
                    <Link
                      className="block py-1 text-gray-700 hover:text-gray-700"
                      to="home"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Home
                    </Link>
                  </div>
                  <div className="text-lg pt-2">
                    <Link
                      className="block py-1 text-gray-700 hover:text-gray-700"
                      to="contact_us"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      Contact us
                    </Link>
                  </div>
                  <div className="text-lg pt-2">
                    <Link
                      className="block py-1 text-gray-700 hover:text-gray-700"
                      to="faq_section"
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                    >
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="">
                <p
                  className="text-2xl font-bold"
                  style={{ marginBottom: "0rem !important" }}
                >
                  Follow us
                </p>

                <div className="w-36">
                  <a href="https://www.linkedin.com/" target="_blank">
                    <img src={require("./../../img/linked.png")} className="w-12" alt="LinkedIn" />
                  </a> &nbsp;
                  <a href="https://www.facebook.com/" target="_blank">
                    <img src={require("./../../img/face.png")} className="w-12" alt="Facebook" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            </div>
          </div>
        </div>

        <div className="mt-28" style={{ marginTop: "-100px" }}></div>
        <div className="last_footer text-muted">
          <hr />
          <div className="pb-3">
            <div className="flex justify-center text-center space-x-6">
              <div className="mt-2 text-xs">
                <span>Alright reserved © 2023 Zaah Toll Plaza</span>
                &nbsp;
                <Link
                  className="mt-2 text-xs text-grey-600"
                  to="contact_us"
                >
                  <span>Any Inquiry?</span>

                </Link>
                &nbsp;
                {/* </div> */}
                {/* <div className="mt-2 text-xs"> */}
                <span>Privacy Policy | Terms &amp; Conditions</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
