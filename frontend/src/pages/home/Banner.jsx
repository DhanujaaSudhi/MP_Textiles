import React from "react";
import { Link } from "react-router-dom";

import bannerImg from "../../assets/front_pic5.jpg";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">PREMIUM QUALITY</h4>
        <h1>Tapes & Ropes</h1>
        <p>
          Discover our durable and versatile collection of tapes and ropes. 
          Whether you're securing, binding, or organizing, our products are 
          designed to meet all your professional and personal needs with unmatched reliability.
        </p>
        <button className="btn">
          <Link to="/shop">SHOP NOW</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="Tapes and Ropes Banner" className="aligned-image" />
      </div>
    </div>
  );
};

export default Banner;
