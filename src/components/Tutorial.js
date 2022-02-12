import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HelpIcon from "@mui/icons-material/Help";
/**
 * Renders the tutorial below the meme section.
 */
export default function Tutorial() {
  // Set the the tutorial to show by default
  const [showTutorial, setShowTutorial] = React.useState(true);

  /**
   * Hides or shows the tutorial depending on the state.
   */
  function handleClick() {
    // Hide or show tutorial depending on the state.
    setShowTutorial((prevState) => !prevState);
  }
  return (
    <main>
      <Button variant="outlined" startIcon={<HelpIcon />} onClick={handleClick}>
        Show Tutorial
      </Button>
      {showTutorial && (
        <Stack spacing={2}>
          <h2 className="title--tutorial">How to make a meme</h2>
          <ol className="tutorial--meme">
            <li>
              <span className="bold">Load a random meme.</span> You can click on
              Generate new meme image to load a new image.
            </li>
            <li>
              <span className="bold">Add customizations.</span> You can add text
              to the top or bottom of the image.
            </li>
          </ol>
          <h2 className="title--reset">How to make a reset text</h2>
          <ol className="tutorial--reset">
            <li>
              <span className="bold">Reset text.</span> You can reset the text
              by clicking the Reset button.
            </li>
          </ol>
          <h2 className="title--download">How to download a meme</h2>
          <ol className="tutorial--download">
            <li>
              <span className="bold">Download a meme.</span> Once a meme is
              loaded, click on the Download button to download the image.
            </li>
          </ol>
        </Stack>
      )}
    </main>
  );
}
