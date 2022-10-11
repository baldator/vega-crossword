import React, { useState } from "react";

const WonPage = ({
  claimStatusClasses,
  claimError,
}) => {
  return (
    <div className="win-page">
      <div className="title">You won!</div>
      <div className="error-wrap">
        <div className="error-icon"></div>
        <div className="win-page-error">
          You still need to claim your prize.
        </div>
      </div>
      <div className="content">
        <form action="">
          <div id="claim-status" className={claimStatusClasses}>
            <p>{claimError}</p>
          </div>
          
          <div className="button-wrap">
            <button
              type="submit"
              className={`win-button`}
              onClick={claimPrize}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WonPage;
