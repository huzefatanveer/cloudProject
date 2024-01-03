// import React from 'react';
// import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const SliderComponent = ({ cardsContent }) => {
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <Slider {...sliderSettings}>
//       <div>
//         <div className="left_black_img">
//           <img
//             src={require('./../../img/Group 61.png')}
//             alt=""
//             style={{ width: '100%', height: '100%' }}
//           />
//         </div>
//       </div>
//       <div>
//         <div className="right_black_img">
//           <img
//             src={require('./../../img/Group 1667.png')}
//             alt=""
//             style={{ width: '100%', height: '100%' }}
//           />
//         </div>
//       </div>
//       <div>
//         <div id="section2" className="w-100">
//           <div className="flex justify-center text-center text-4xl font-semibold">
//             <div className="2xl:w-3/12">
//               <span style={{ color: '#4E79CF' }}>Fast</span> and Reliable{' '}
//               <span style={{ color: '#4E79CF' }}>Recruitment</span> Solution
//             </div>
//           </div>
//           <div className="flex text-center my-28">
//             <div className="services_bg ml-80">
//               <img
//                 className=""
//                 src={require('./../../img/Group 1669.png')}
//                 alt=""
//                 style={{ width: '100%', height: '100%' }}
//               />
//             </div>
//             <div className="w-100 gap-3 flex flex-wrap justify-center xl:space-x-16 2xl:space-x-24">
//               {cardsContent.map((el, i) => (
//                 <div key={i} className="">
//                   <Card
//                     img={el.img}
//                     heading={el.heading}
//                     description={el.description}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Slider>
//   );
// };

// export default SliderComponent;
