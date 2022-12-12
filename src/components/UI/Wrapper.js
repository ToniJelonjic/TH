import React from "react";
import "./Wrapper.css";
import UserCard from "./UserCard";

const Wrapper = (props) => {
  return (
    <div className="app">
      <UserCard />
      {props.children}
    </div>
  );
};

export default Wrapper;
