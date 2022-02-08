import React from "react";

// Get local sample meme data
import memesData from "../memesData";

export default function Meme() {
  /* Returns a 2 column and 3 row grid form. */

  // Create a meme object for the topText, bottomText, and URL.
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  // Set the initial meme image to blank
  const [memeImage, setMemeImage] = React.useState("");

  // display random image from memesData
  function getMemeImage() {
    const memesArray = memesData.data.memes;
    // Generate random number for for the index in the memes array
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    setMemeImage(memesArray[randomNumber].url);
  }

  // Create a new meme image element when we click Get a new meme image
  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
        />
        <button className="form--button" type="button" onClick={getMemeImage}>
          Get a new meme image
        </button>
        <button className="form--reset" type="button">
          Reset
        </button>
      </div>
      <img src={memeImage} className="meme--image" alt="" />
    </main>
  );
}
