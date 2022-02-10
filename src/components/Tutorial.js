import React from "react";
// Fake summary data
import summaryData from "../data/summary.json";
/**
 * Renders the tutorial below the meme section.
 * @returns None
 */
export default function Tutorial() {
  /**
   * Returns the first paragraph from the Wikipedia summary.
   * @param {String} content : Value of summary taken from the JSON file.
   * @returns
   */
  function firstParagraph(content) {
    let result = content.slice(0, 506);
    return result;
  }

  /**
   * Returns the second paragraph from the Wikipedia summary.
   * @param {String} content : Value of summary taken from the JSON file.
   * @returns
   */
  function secondParagraph(content) {
    let result = content.slice(506, 1056);
    return result;
  }

  /**
   * Returns the third paragraph from the Wikipedia summary.
   * @param {String} content : Value of summary taken from the JSON file.
   * @returns
   */
  function thirdParagraph(content) {
    let result = content.slice(1056);
    return result;
  }
  return (
    <main>
      <h2 className="title--tutorial">What is a meme?</h2>
      {summaryData.map((summaryDetail, index) => {
        return <p>{firstParagraph(summaryDetail.summary)}</p>;
      })}
      {summaryData.map((summaryDetail, index) => {
        return <p>{secondParagraph(summaryDetail.summary)}</p>;
      })}
      {summaryData.map((summaryDetail, index) => {
        return <p>{thirdParagraph(summaryDetail.summary)}</p>;
      })}

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
