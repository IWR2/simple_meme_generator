import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DownloadIcon from "@mui/icons-material/Download";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// List of Articles to search
import searchData from "../data/searches";

/**
 * Renders the text inputs, buttons, and random meme image.
 * @returns None
 * Source:
 * https://mui.com/components/dialogs/#customization
 */
export default function Meme() {
  // Intialize open state for the Reset button.
  const [open, setOpen] = useState(false);

  // Create a meme state for the topText, bottomText, URL, imageWidth, imageHeight.
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
    imageWidth: 0,
    imageHeight: 0,
  });

  // Create a Wiki state for article name and search param and
  // set "Internet Meme" as the first wiki article to search
  const [wikiContent, setWikiContent] = useState({
    wikiArticle: "",
    wikiSearch: "",
    wikiText: "",
  });

  // Initialize new state variable that defaults to the imported wiki data array.
  const [allWiki, setAllWiki] = useState(searchData);

  // Image from url for canvas
  const [image, setImage] = useState(null);

  // Initialize new state variable that defaults to the imported memes data array.
  const [allMemes, setAllMemes] = useState([]);

  // Canvas to create the meme with top and bottom text
  const canvas = useRef(null);

  /**
   * Makes an API call to https://api.imgflip.com/get_memes.
   * When the data comes in, it saves the memes array part of that
   * data to the allMemes state. Sets a random wiki article upon
   * every click.
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
    // Generate random number for the index in the allMemes array
    const randomNumberMemes = Math.floor(Math.random() * allMemes.length);

    // Random meme Content
    const url = allMemes[randomNumberMemes].url;
    const width = allMemes[randomNumberMemes].width;
    const height = allMemes[randomNumberMemes].height;

    // Set Image Canvas to use the image url
    const memeImage = new Image();
    // Enable Cross-Origin anonymous for downloading
    memeImage.crossOrigin = "Anonymous";
    // Store the url
    memeImage.src = url;
    // Set the meme iamge
    memeImage.onload = () => setImage(memeImage);

    // Allow change to randomImage url, width or height independently
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
      imageWidth: width,
      imageHeight: height,
    }));
  }

  /**
   * Displays a random article
   */
  function getWikiArticle() {
    // From the data.js get the articles array
    const searchArray = allWiki.data.articles;
    // Generate random number for the index in the allWiki array
    let randomNumber = Math.floor(Math.random() * searchArray.length);
    //console.log(articleText);
    let articleTitle = searchArray[randomNumber].name;
    // Wiki Content
    let searchParam = searchArray[randomNumber].search;

    // Send a get request to teammate's API with searchParam and
    // set the wikiText as the response value
    fetchData(searchParam);

    // Only set Wiki content for article and search
    setWikiContent((prevWiki) => ({
      ...prevWiki,
      wikiArticle: articleTitle,
      wikiSearch: searchParam,
    }));
  }

  /**
   * Makes a Get Request for a random article to my teammate's Wiki Scraper.
   * When the data comes in, it saves the the search query and response
   * to be displayed as a header and a paragraph element. It uses the random
   * search parameter from the list of searches.
   */
  const fetchData = async (searchParam) => {
    const response = await axios.get(
      `https://cs361-wiki-app.herokuapp.com/?search=${searchParam}`
    );
    let newText = "";
    // Add a newline for each paragraph
    // Special case for meme article which has no newline
    if (searchParam == "meme") {
      // Add double newlines inbetween each paragraph
      newText = addNewLine(response.data[searchParam]);
    } else {
      // Regular case, Add a new line after every newline to separate paragraphs
      newText = response.data[searchParam].replace(/\n/g, "\n\n");
    }
    // Set the wikiText as the newText
    setWikiContent((prevWiki) => ({
      ...prevWiki,
      wikiText: newText,
    }));
    //console.log(response.data[searchParam]);
    //console.log(searchParam);
  };

  /**
   * Slices the text at each paragraph and adds 2 newline characters in between them.
   * @param {String} text Text from Wiki Meme article to add new lines to
   * @returns {String} newText  New string with added newlines characters.
   */
  function addNewLine(text) {
    // Separate each paragraph similarly to Wiki Meme article
    const firstParagraph = text.slice(0, 562);
    const secondParagraph = text.slice(562, 923);
    const thirdParagraph = text.slice(923, 1216);
    const fourthParagraph = text.slice(1216, 1860);
    // Add 2 newlines between each paragraph
    let newText =
      firstParagraph +
      "\n\n" +
      secondParagraph +
      "\n\n" +
      thirdParagraph +
      "\n\n" +
      fourthParagraph +
      "\n\n";
    return newText;
  }

  /**
   * Download function to download meme image
   */
  function handleDownload() {
    var canvas = document.getElementById("canvas");
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    // Name the file meme.png
    link.download = "meme.png";
    link.href = url;

    link.click();
  }

  /**
   * Creates a canvas to draw and write text over the meme image. Cavnas
   * is rerendered whenever there is a change to the URL or text chjanges.
   * Source:
   * https://workshops.hackclub.com/meme_generator/
   */
  useEffect(
    function () {
      // Fetch the response and parse it into javascript, and set that object
      // into the meme array.
      // If we have both image and canvas,
      if (image && canvas) {
        // Get the 2d content
        const ctx = canvas.current.getContext("2d");
        // Draw the image
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.textAlign = "center";
        // Set and style the font according to the size of the image's width
        let fontSize = meme.imageWidth * 0.1;
        ctx.font = `${fontSize}px Impact`;
        ctx.lineWidth = fontSize / 20;

        ctx.textAlign = "center";
        // Set position for Top text
        ctx.textBaseline = "bottom";
        ctx.fillText(
          meme.topText,
          meme.imageWidth / 2,
          fontSize,
          meme.imageWidth
        );
        ctx.strokeText(
          meme.topText,
          meme.imageWidth / 2,
          fontSize,
          meme.imageWidth
        );
        // Set position for Bottom text
        ctx.fillText(
          meme.bottomText,
          meme.imageWidth / 2,
          meme.imageHeight,
          meme.imageWidth
        );
        ctx.strokeText(
          meme.bottomText,
          meme.imageWidth / 2,
          meme.imageHeight,
          meme.imageWidth
        );
      }
    },
    [image, canvas, meme]
  );

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

  // Set every button's size
  const buttonStyle = {
    maxWidth: "478px",
    maxHeight: "40px",
    minWidth: "478px",
    minHeight: "30px",
  };

  // Create a new randomImage image when we click Get a new meme image
  // Only display the text if there's a meme image.
  return (
    <main>
      <div className="form">
        {/* Buttons to load a new meme image and reset text. */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              id="outlined-textarea"
              label="Top text"
              placeholder="Top text"
              className="form--input"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
              multiline
            />
            <TextField
              id="outlined-textarea"
              label="Bottom Text"
              placeholder="Bottom Text"
              className="form--input"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
              multiline
            />
          </Stack>
          <Button
            style={buttonStyle}
            className="form--button"
            variant="contained"
            startIcon={<InsertEmoticonRoundedIcon />}
            onClick={() => {
              getMemeImage();
              getWikiArticle();
            }}
          >
            Get a new meme image
          </Button>
          <Button
            style={buttonStyle}
            className="form--reset"
            variant="contained"
            startIcon={<RotateLeftRoundedIcon />}
            color="secondary"
            onClick={handleClickOpen}
          >
            Reset
          </Button>
          {/* Only show the download button when there is an image*/}
          {meme.randomImage && (
            <Button
              style={buttonStyle}
              className="form--download"
              variant="contained"
              startIcon={<DownloadIcon />}
              color="success"
              onClick={handleDownload}
            >
              Download
            </Button>
          )}
        </Stack>

        {/* Button to trigger the opening of the dialog */}
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
      {/* Only show image and wiki article if there's an image loaded. */}
      {meme.randomImage && (
        <div className="meme">
          <canvas
            id="canvas"
            className="meme--image"
            ref={canvas}
            width={meme.imageWidth}
            height={meme.imageHeight}
          />
          <h2>{wikiContent.wikiArticle}</h2>
          <p className="meme--facts">{wikiContent.wikiText}</p>
        </div>
      )}
    </main>
  );
}
