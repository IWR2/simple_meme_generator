import React, { useState, useEffect } from "react";

// Get local sample meme data
import memesData from "../memesData";

/**
 * Renders the text inputs, buttons, and random meme image.
 * @returns None
 */
export default function Meme() {
  // Create a meme object for the topText, bottomText, and URL.
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  // Initialize new state variable that defaults to the imported memesData array.
  //const [allMemes, setAllMemes] = React.useState(memesData);
  const [allMemes, setAllMemes] = React.useState(memesData);

  /**
   * Makes an API call to https://api.imgflip.com/get_memes.
   * When the data comes in, it saves the memes array part of that
   * data to the allMemes state.
   */
  useEffect(function () {
    // Fetch the response and parse it into javascript, and set that object
    // into the meme array.
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  // Check if we got the meme urls array
  console.log(allMemes);
  /**
   * Changes the meme randomImage prop source to a random image.
   */
  function getMemeImage() {
    // Get the
    const memesArray = allMemes.data.memes;
    // Generate random number for for the index in the memes array
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    // Image URL string
    const url = memesArray[randomNumber].url;
    // Change only the randomImage url.
    setAllMemes((prevMeme) => ({
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
  /**
   * Replaces the hard-coded text on the image with the
   * text being saved to state for the meme object.
   * @param {event object } event
   */
  function handleChange(event) {
    // Get the name and value properties from the event target.
    const { name, value } = event.target;
    // Get the previous data and only update the top or bottom text.
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
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
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" type="button" onClick={getMemeImage}>
          Get a new meme image
        </button>
        <button className="form--reset" type="button" onClick={resetText}>
          Reset
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
