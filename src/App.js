import React from "react";

import Header from "./components/Header";
import Meme from "./components/Meme";
import Tutorial from "./components/Tutorial";

export default function App() {
  /**
   * Renders the Header component
   */
  return (
    <div className="App">
      <Header />
      <Meme />
      <Tutorial />
    </div>
  );
}
