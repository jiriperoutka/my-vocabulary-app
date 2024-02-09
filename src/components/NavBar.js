import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <img
              src="/logoText.png"
              alt="Logo Text"
              style={{ width: "100px", height: "50px" }}
            />
          </div>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
