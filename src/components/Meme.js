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
import Tooltip from "@mui/material/Tooltip";

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
    const randomNumberMemes = Math.floor(Math.random() * allMemes.length);

    const url = allMemes[randomNumberMemes].url;
    const width = allMemes[randomNumberMemes].width;
    const height = allMemes[randomNumberMemes].height;

    // Set Image Canvas to use the image url
    const memeImage = new Image();
    memeImage.crossOrigin = "Anonymous";
    memeImage.src = url;
    memeImage.onload = () => setImage(memeImage);

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
      imageWidth: width,
      imageHeight: height,
    }));
  }

  /**
   * Selects a random article and sets the article title then calls
   * fetchData to make a get request to my teammate's microservice.
   */
  function getWikiArticle() {
    const searchArray = allWiki.data.articles;

    let randomNumber = Math.floor(Math.random() * searchArray.length);

    let articleTitle = searchArray[randomNumber].name;
    let searchParam = searchArray[randomNumber].search;

    // Only set Wiki content for article and search
    setWikiContent((prevWiki) => ({
      ...prevWiki,
      wikiArticle: articleTitle,
    }));

    // Send a get request to teammate's microservice
    fetchData(searchParam);
  }

  /**
   * Makes a Get Request for a random article to my teammate's Wiki Scraper.
   * When the data comes in, it saves the the search query and response
   * to be displayed as a header and a paragraph element. It uses the random
   * search parameter from the list of searches.
   * @param {String} searchParam Article to search for.
   */
  const fetchData = async (searchParam) => {
    const response = await axios.get(
      `https://cs361-wiki-app.herokuapp.com/?search=${searchParam}`
    );

    let newText = "";
    // Add a newline for each paragraph
    if ("meme" || "internet_meme" in searchParam) {
      // Add double newlines in between each paragraph
      newText = formatText(response.data[searchParam]);
    } else {
      newText = response.data[searchParam].replace(/\n/g, "\n\n");
    }

    // Set the wikiText as the newText
    setWikiContent((prevWiki) => ({
      ...prevWiki,
      wikiText: newText,
    }));
  };

  /**
   * Formats the chunk of text from teammate's microservice into separate
   * paragraphs by finding period endstops with no whitespace and replacing
   * newlines with double newlines.
   * @param {String} text Text from Wiki Meme article to add new lines to
   * @returns {String} newText New string with added newlines characters.
   */
  function formatText(text) {
    // Find special case of a period next to a quotation mark
    // and add a space to it
    let newText = text.replace('."', '. "');
    // Find any period that does not have whitespace and
    // add a newline next to it.
    newText = newText.replace(/\.(?!\s|$)/g, "\n");
    // Add 2 newlines between each paragraph
    newText = newText.replace(/\n/g, "\n\n");

    return newText;
  }

  /**
   * Download function to download meme image
   */
  function handleDownload() {
    let canvas = document.getElementById("canvas");
    let url = canvas.toDataURL("image/png");
    let link = document.createElement("a");

    // Name the file meme.png
    link.download = "meme.png";
    link.href = url;

    link.click();
  }

  /**
   * Creates a canvas to draw and write text over the meme image. Cavnas
   * is rerendered whenever there is a change to the URL or text changes.
   * Source:
   * https://workshops.hackclub.com/meme_generator/
   */
  useEffect(
    function () {
      if (image && canvas) {
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
    handleClose();
  }

  /**
   * Changes the text on the image and saves it when generating a new
   * image.
   * @param {event object } event Top or bottom text field.
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

  // Renders the canvas image, buttons, and Wiki paragraph
  return (
    <main>
      <div className="form">
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
          {/* Button to load image and Wiki Article */}
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
          {/* Button Reset Text */}
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
          {
            /* Only show the Download button when there is an image*/
            meme.randomImage && (
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
            )
          }
        </Stack>
        {/* Alert dialoge when the user clicks on Reset */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Reset the text?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to reset the top and bottom text of your meme.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
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
      {
        /* Only show image and Wiki article if there's an image loaded. */
        meme.randomImage && (
          <div className="meme">
            <Tooltip
              title="Right click me and click Save Image As to download!"
              placement="bottom"
            >
              <canvas
                id="canvas"
                className="meme--image"
                ref={canvas}
                width={meme.imageWidth}
                height={meme.imageHeight}
              />
            </Tooltip>
            <h2>{wikiContent.wikiArticle}</h2>
            <p className="meme--facts">{wikiContent.wikiText}</p>
          </div>
        )
      }
    </main>
  );
}
