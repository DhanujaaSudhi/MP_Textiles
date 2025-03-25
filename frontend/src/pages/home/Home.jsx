// import React from "react";
// import Banner from "./Banner";
// import Categories from "./Categories";
// // import HeroSection from "./HeroSection";
// import TrendingProducts from "../shop/TrendingProducts";
// // import DealsSection from "./DealsSection";
// import PromoBanner from "./PromoBanner";
// import Blogs from "../blogs/Blogs";

// const Home = () => {
//   return (
//     <>
//       <Banner />
//       <Categories />
//       {/* <HeroSection /> */}
//       <TrendingProducts />
//       {/* <DealsSection /> */}
//       <PromoBanner />
//       <Blogs />
//     </>
//   );
// };

// export default Home;



import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import TrendingProducts from "../shop/TrendingProducts";
import PromoBanner from "./PromoBanner";
import Blogs from "../blogs/Blogs";
import WhatsAppButton from "../../components/WhatsAppButton";  // Import the WhatsApp button

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <TrendingProducts />
      <PromoBanner />
      <Blogs />
      <WhatsAppButton />  {/* Add the WhatsApp button here */}
    </>
  );
};

export default Home;
