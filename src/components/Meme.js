import React from "react";

export default function Meme() {
  /* Returns a 2 column and 3 row grid form. */

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value="Top Text"
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value="Bottom Text"
        />
        <button className="form--button" type="button" onClick="">
          Get a new meme image
        </button>
        <button className="form--reset" type="button" onClick="">
          Reset
        </button>
      </div>
    </main>
  );
}
