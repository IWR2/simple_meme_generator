import React from "react";

/**
 * Renders the header with the logo and title.
 * @returns
 */
export default function Header() {
  return (
    <header className="header">
      <img
        src="../assets/pika-logo.png"
        className="header--image"
        alt="Surprised Pika Face"
      />
      <h2 className="header--title">Meme Generator</h2>
      <h4 className="header--project">By Team Amazable</h4>
    </header>
  );
}
