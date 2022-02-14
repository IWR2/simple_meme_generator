import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HelpIcon from "@mui/icons-material/Help";
import Stack from "@mui/material/Stack";

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
      <Button
        variant="contained"
        startIcon={<HelpIcon />}
        onClick={handleClick}
      >
        {showTutorial ? "Hide" : "Show"} Tutorial
      </Button>
      {showTutorial && (
        <Box
          sx={{
            p: 1,
            width: "400px",
            height: "300px",
            m: 1,
            border: 1,
            display: "flex",
            justifyContent: "center",
            borderRadius: "16px",
            backgroundColor: "#96acfb",
          }}
        >
          <Stack spacing={2}>
            <h3 className="title--tutorial">How to make a meme</h3>
            <ol className="tutorial--meme">
              <li>
                <span className="bold">Load a random meme.</span> You can click
                on Generate new meme image to load a new image.
              </li>
              <li>
                <span className="bold">Add customizations.</span> You can add
                text to the top or bottom of the image.
              </li>
            </ol>
            <h3 className="title--reset">How to make a reset text</h3>

            <ol className="tutorial--reset">
              <li>
                <span className="bold">Reset text.</span> You can reset the text
                by clicking Reset.
              </li>
            </ol>
          </Stack>
        </Box>
      )}
    </main>
  );
}
