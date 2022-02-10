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
   * @returns {String} result: Text of a paragrpah from JSON.
   */
  function firstParagraph(content) {
    let result = content.slice(0, 506);
    return result;
  }

  /**
   * Returns the second paragraph from the Wikipedia summary.
   * @param {String} content : Value of summary taken from the JSON file.
   * @returns {String} result: Text of a paragrpah from JSON.
   */
  function secondParagraph(content) {
    let result = content.slice(506, 1056);
    return result;
  }

  /**
   * Returns the third paragraph from the Wikipedia summary.
   * @param {String} content : Value of summary taken from the JSON file.
   * @returns {String} result: Text of a paragrpah from JSON.
   */
  function thirdParagraph(content) {
    let result = content.slice(1056);
    return result;
  }
  return (
    <main>
      <h2 className="title--tutorial">What is a meme?</h2>
      {/* Add unique key to each JSON slice paragraph to avoid list warning */}
      {summaryData.map((summaryDetail) => {
        return <p key="1">{firstParagraph(summaryDetail.summary)}</p>;
      })}
      {summaryData.map((summaryDetail) => {
        return <p key="2">{secondParagraph(summaryDetail.summary)}</p>;
      })}
      {summaryData.map((summaryDetail) => {
        return <p key="3">{thirdParagraph(summaryDetail.summary)}</p>;
      })}
      <h2 className="title--tutorial">How to make a meme</h2>
      <ol className="meme--tutorial">
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
      <ol className="reset--tutorial">
        <li>
          <span className="bold">Reset text.</span> You can reset the text by
          clicking the Reset button.
        </li>
      </ol>
    </main>
  );
}
