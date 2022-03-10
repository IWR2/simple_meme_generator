import React from "react";
import Tooltip from "@mui/material/Tooltip";

/**
 * Renders the header with the logo and title.
 */
export default function Header() {
  /**
   * Refersh the page to reset the state.
   */
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <header className="header">
      <Tooltip title="Click me to reset the page!" placement="bottom">
        <img
          onClick={refreshPage}
          src="../assets/pika-logo.png"
          className="header--image"
          alt="Surprised Pika Face"
        />
      </Tooltip>
      <h2 onClick={refreshPage} className="header--title">
        Meme Generator
      </h2>
    </header>
  );
}
