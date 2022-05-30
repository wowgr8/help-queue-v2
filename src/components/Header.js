import React from "react";
import ticketsImage from "./../img/tickets.png";

function Header(){
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <img src={ticketsImage} alt="single ticket" />
    </React.Fragment>
  );
}

export default Header;