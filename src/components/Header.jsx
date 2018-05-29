import React, { Component } from "react";

class Header extends Component {
  render = () => (
    <header
      style={{
        background: "#1BAAA3",
        padding: 8,
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: 500,
        fontSize: "1.15rem"
      }}>
      <div>Doing Things</div>
    </header>
  );
}

export default Header;
