import React, { useState } from "react";
import actions from "../services/index";
import "../styles/navbar_styles/user.css";

const ConnectButton = props => {
  const [userId, setUserId] = useState("");

  const connect = () => {
    console.log(props?.currUserId, "peach");
    console.log(props?.utcId, "pear");
    actions
      .connect(props?.currUserId, props?.utcId)
      .then(res => props.setUser(res.data));
  };

  return (
    <button className="connectButton" onClick={connect}>
      Follow
    </button>
  );
};

export default ConnectButton;
