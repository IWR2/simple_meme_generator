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

  // Initialize new state variable that defaults to the imported memesData array.
  const [allMemeImages, setAllMemeImages] = React.useState(memesData);

  /**
   * Changes the meme randomImage prop source to a random image.
   */
  function getMemeImage() {
    // Get the
    const memesArray = allMemeImages.data.memes;
    // Generate random number for for the index in the memes array
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    // Image URL string
    const url = memesArray[randomNumber].url;
    // Change only the randomImage url.
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  /**
   * Resets the topText and bottomText to an empty string when the user
   * presses the Reset button.
   */
  function resetText() {
    setMeme((prevMeme) => ({
      ...prevMeme,
      topText: "",
      bottomText: "",
    }));
  }

  // Create a new randomImage image when we click Get a new meme image
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
        <button className="form--reset" type="button" onClick={resetText}>
          Reset
        </button>
      </div>
      <img src={meme.randomImage} className="meme--image" alt="" />
    </main>
  );
}
