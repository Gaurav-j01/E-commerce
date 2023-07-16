import React, { useState, useContext } from "react";

// Components
import Footer from "../components/Footer";

// Media
import MainBG from "../assets/1.webp";
import ShoeBanner from "../assets/shoe_banner.png";
import ShoppyLogo from "../assets/android-chrome-512x512.png";

import { myLists, myCards, mySections } from "../components/CommonData";

import { Link } from "react-router-dom";

// Styling
import "../styles/MainPage.scss";
import { GlobalValue } from "../context/GlobalValue";

const MainPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const { setNavValue } = useContext(GlobalValue);

  return (
    <div className="Maincontent_container">
      {/* 1. First Component */}
      <div className="Maincontent_container-textbg">
        <div className="Maincontent_container-bg">
          <img
            src={MainBG}
            alt="Dress Background"
            height={"100%"}
            width={"100%"}
          />
        </div>
        <div className="Maincontent_container-text">
          <p>PREETY FOR SUMMER</p>
          <Link to="/Shop" onClick={() => setNavValue("New & Featured")}>
            <span>SHOP&nbsp;ALL&nbsp;NEW</span>
          </Link>
        </div>
      </div>

      {/* 2. Summer text Banner Component */}
      <div className="Maincontent_container-summer_text">
        <span>Summer Essentials</span>
        <h3>Chase the day</h3>

        <p>
          Move. Explore. Bring your boldest <br /> Get after summer's endless
          possibilities with ready-for-anything fits.
        </p>
        <Link to="/Shop" onClick={() => setNavValue("Sale")}>
          <button>Shop</button>
        </Link>
      </div>

      {/* 3. Shop Options Component */}
      <div className="Maincontent_container_shop-options">
        {Object.keys(myLists).map((key) => (
          <div key={key} className="Maincontent_shop_image-container">
            <Link to="/Shop" onClick={() => setNavValue("Women")}>
              <img
                id={`hide_img-${isHovered == key ? key : ""}`}
                className="Shop-options_main-img"
                src={myLists[key].property1}
                alt={myLists[key].property1}
                onMouseEnter={() => setIsHovered(key)}
              />
              <img
                id={`show_img-${isHovered == key ? key : ""}`}
                className="Shop-options_hover-img"
                src={myLists[key].property4}
                alt={myLists[key].property4}
                onMouseLeave={() => setIsHovered(null)}
              />
            </Link>
            <p>{myLists[key].property2} </p>
            <span>$ {myLists[key].property3.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* 4. Shoe Banner Component */}
      <div className="Maincontent_container_shoes-banner">
        <div className="Shoe_banner-logo_text-container">
          <img src={ShoppyLogo} alt="Shoppy Logo" />
          <h1>
            {" "}
            New <br /> Arrivals{" "}
          </h1>
        </div>
        <img src={ShoeBanner} alt="Shoe Banner" />
        <Link to="/Shop" onClick={() => setNavValue("Men")}>
          <button>Shop Now</button>
        </Link>
      </div>

      {/* 5. Card Options Component */}
      <div className="Maincontent_container_cards-options">
        {Object.entries(myCards).map(([card, properties]) => (
          <div key={card} className="Maincontent_shop_card-container">
            <img src={properties.property1} alt={card} />
            <div className="Maincontent_shop_card-texts">
              <span>{properties.property2}</span>
              <p>{properties.property3}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Men's, Women and Kids Section Heading*/}
      <div className="Maincontent_container_section-heading">
        <p>Explore</p>
      </div>

      {/* 6. Men's, Women and Kids Section */}
      <div className="Maincontent_container-gender_sections">
        {Object.entries(mySections).map(([section, properties]) => (
          <div key={section} className="Maincontent_container-sections">
            <Link to="/Shop" onClick={() => setNavValue(properties.property2)}>
              <img src={properties.property1} alt="" />
              <button>{properties.property2}'s</button>
            </Link>
          </div>
        ))}
      </div>

      {/* 7. About Page */}
      <div className="Maincontent_container-about_section">
        <h1>
          {" "}
          MADE FOR THE MODERN <br /> SHOPPING{" "}
        </h1>

        <div className="Maincontent_container-about_text">
          <p>
            Welcome to Shoppy, where dreams become fashion reality! We are the
            trendsetters, the style mavens, and the shopping destination that
            fuels your passion for all things fabulous. Dive into our carefully
            curated collection of cutting-edge fashion, statement accessories,
            and irresistible homeware. From runway-inspired looks to everyday
            essentials, Shoppy empowers you to express your unique style
            effortlessly. Step into a world of endless possibilities and let
            your inner fashionista shine bright with Shoppy!
          </p>
            <a href="https://github.com/Gaurav-jo1" target="_blank">
            <button>
                ABOUT US
            </button>
            </a>
        </div>
      </div>

      <div className="Maincontent_container-footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
