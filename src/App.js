import React from "react";

import Header from "./components/Header";
import Meme from "./components/Meme";
import Tutorial from "./components/Tutorial";

/**
 * Renders each component.
 * @returns None
 */
export default function App() {
  return (
    <div className="App">
      <Header />
      <Tutorial />
      <Meme />
    </div>
  );
}
