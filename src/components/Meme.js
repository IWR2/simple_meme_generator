import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/**
 * Renders the text inputs, buttons, and random meme image.
 * @returns None
 * Source:
 * https://mui.com/components/dialogs/#customization
 */
export default function Meme() {
  // Intialize open state for the Reset button.
  const [open, setOpen] = useState(false);

  // Create a meme object for the topText, bottomText, and URL.
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  // Initialize new state variable that defaults to the imported memesData array.
  const [allMemes, setAllMemes] = useState([]);

  /**
   * Makes an API call to https://api.imgflip.com/get_memes.
   * When the data comes in, it saves the memes array part of that
   * data to the allMemes state.
   * Source:
   * https://imgflip.com/api
   */
  useEffect(function () {
    // Fetch the response and parse it into javascript, and set that object
    // into the meme array.
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  /**
   * Changes the meme randomImage prop source to a random image.
   */
  function getMemeImage() {
    // Generate random number for for the index in the allMemes array
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    // Image URL string
    const url = allMemes[randomNumber].url;
    // Change only the randomImage url.
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  /**
   * Sets the dialoge button openDialog state to true.
   */
  function handleClickOpen() {
    setOpen(true);
  }
  /**
   * Sets the dialoge button open state to false.
   */
  function handleClose() {
    setOpen(false);
  }

  /**
   * Closes the dialoge box and Resets the topText and bottomText to an
   * empty string when the user presses the Reset button.
   */
  function handleAgree() {
    console.log("I agree!");
    setMeme((prevMeme) => ({
      ...prevMeme,
      topText: "",
      bottomText: "",
    }));
    handleClose();
  }
  /**
   * Closes the dialog box and sets open state to close.
   */
  function handleDisagree() {
    console.log("I do not agree.");
    handleClose();
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
  // Only display the text if there's a meme image.
  return (
    <main>
      <div className="form">
        {/* Input text boxes for top and bottom text. */}
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
        {/* Buttons to load a new meme image and reset text. */}
        <button className="form--button" type="button" onClick={getMemeImage}>
          Get a new meme image
        </button>
        {/* Button to trigger the opening of the dialog */}
        <button className="form--reset" type="button" onClick={handleClickOpen}>
          Reset
        </button>
        {/* Alert dialoge when the user clicks on Reset */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* Set the dialog title */}
          <DialogTitle id="alert-dialog-title">
            {"Reset the text?\n"}
          </DialogTitle>
          {/* Set the dialog content */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to reset the top and bottom text of your meme.
            </DialogContentText>
          </DialogContent>
          {/* Set the dialog buttona actions */}
          <DialogActions>
            {/* Set the styles for the Agree and Disagree buttons. */}
            <Button onClick={handleDisagree} variant="outlined" color="error">
              Disagree
            </Button>
            <Button
              onClick={handleAgree}
              autoFocus
              variant="contained"
              color="success"
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* Only show text on the image if there's an image loaded. */}
      {meme.randomImage && (
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" alt="" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      )}
    </main>
  );
}
