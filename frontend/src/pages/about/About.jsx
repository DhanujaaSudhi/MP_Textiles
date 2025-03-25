import React from "react";
import about from "../../assets/card.jpeg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-16 px-6 md:px-20 lg:px-40">
        <h1 className="text-4xl font-extrabold text-rose-600 mb-6 leading-tight ">
          About Us
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start">
  {/* Left Content Section */}
  <div className="md:w-1/2 md:pr-10 flex flex-col justify-center text-center md:text-left mx-auto px-4">
    {/* <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      MP Textiles in Komarapalayam, Tiruchengode, is known to satisfactorily cater to the demands of its customer base. 
      It stands located at No 233A, Behind KVB Bank, Salem Main Road, Komarapalayam-638183. 
      Behind KVB Bank is a prominent landmark in the area, and this establishment is in close proximity to the same. 
      The business strives to make for a positive experience through its offerings.
    </p> */}
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      MP Textiles is a customizable industrial factory offering a wide range of designs in tapes and ropes, 
      available in kilograms and meters. Known for its quality products, friendly budget, and timely delivery, 
      the establishment ensures customer satisfaction at every step. Customer centricity is at the core of MP Textiles 
      in Komarapalayam, Tiruchengode, and it is this belief that has led the business to build long-term relationships. 
      Ensuring a positive customer experience and making available goods and/or services that are of top-notch quality 
      is given prime importance.
    </p>
    <p className="text-lg text-gray-700 leading-relaxed">
      <span className="text-highlight font-bold">The establishment is functional on:</span><br />
      Monday to Saturday: 9:30 AM - 8:00 PM<br />
      Sunday: Closed
    </p>
  </div>





          {/* Right Image Section */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src={about}
              alt="About Us"
              className="rounded-lg shadow-lg w-full object-cover max-h-96  object-contain"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
