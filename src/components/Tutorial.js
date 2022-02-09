import React from "react";

/**
 * Renders the tutorial below the meme section.
 * @returns None
 */
export default function Tutorial() {
  return (
    <main>
      <h2 className="title--tutorial">How to make a meme</h2>
      <ol className="meme--tutorial" type="1">
        <li>
          <span className="bold">Choose an image.</span> You can click on
          Generate new meme image to load a new image.
        </li>
        <li>
          <span className="bold">Add customizations.</span> You can add text to
          the bottom or top of the image.
        </li>
      </ol>
      <h2 className="title--reset">How to make a reset text</h2>
      <ol className="reset--tutorial" type="1">
        <li>
          <span className="bold">Reset text.</span> You can reset the text by
          clicking the Reset button.
        </li>
      </ol>
    </main>
  );
}
