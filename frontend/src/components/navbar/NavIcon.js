import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar_styles/NavIcon.css";

const NavIcon = props => {
  return (
    <Link to={props.destination}>
      <img id="icon_img" src={props.icon} />
    </Link>
  );
};

export default NavIcon;
