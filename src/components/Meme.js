import React from "react";

// Get local sample meme data
import memesData from "../memesData";

export default function Meme() {
  /* Returns a 2 column and 3 row grid form. */

  // display random image from memesData
  function getMemeImage() {
    //console.log("Clicked");
    const memesArray = memesData.data.memes;
    // Generate random number for for the index in the memes array
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    // Test random number
    //console.log(randomNumber);
    // Get url with the random url
    const url = memesArray[randomNumber].url;
    // Test URL
    console.log(url);
  }

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
        <button className="form--button" type="button" onClick={getMemeImage}>
          Get a new meme image
        </button>
        <button className="form--reset" type="button" onClick="">
          Reset
        </button>
      </div>
    </main>
  );
}
