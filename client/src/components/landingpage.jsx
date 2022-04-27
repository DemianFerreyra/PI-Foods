import { Link } from "react-router-dom";
import React from "react";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div className="Darkening"></div>
      <div className="Intro">
        <h1>Henry Kitchen</h1>
        <Link to="/inicio">
          <button className="LandingButton">Are you hungry?</button>
        </Link>
      </div>
    </div>
  );
};
export default LandingPage;