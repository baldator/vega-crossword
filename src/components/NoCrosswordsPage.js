import React from "react";

const NoCrosswordsPage = () => {
  return (
    <div className="container no-puzzles">
      <div className="successful-page-title">All puzzles have been solved</div>

      <div className="successful-text">
        Sorry friend, no crossword puzzles available at this time. Please try again later. During NEARCON we publish a new puzzle every 5 minutes.
      </div>
      <div className="successful-text">
        In the meantime, check out the links below.
      </div>
      <div className="arrows" />
      <div className="success-links">
        <div className="success-link">
          <div className="bridge-text">NEAR Official Metaverse </div>
          <a
            href="https://nearhub.club?from=crossword"
            className="near-link"
            target="_blank"
          >
            NEARHUB
          </a>
        </div>
        <div className="success-link">
          <div className="bridge-text">NEAR music streaming platform</div>
          <a
            href="https://www.tamastream.io?from=crossword"
            className="near-link"
            target="_blank"
          >
            Tamago
          </a>
        </div>
      </div>
    </div>
  );
};
export default NoCrosswordsPage;
