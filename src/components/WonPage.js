import React, { useState } from "react";

const items = localStorage.getItem('crosswordSolutionPublicKey');

const WonPage = ({
  claimStatusClasses,
  claimError,
}) => {
  return (
    <div className="win-page">
      <div className="title">You got it!</div>
      <div>Submit your answer by using the following form and include the following string as the solution: {items} </div>
      
      <div className="error-wrap">
        
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
                onClick={(event) => {event.preventDefault();window.open("https://vegaprotocol.typeform.com/bloghunt", '_blank')}} 
              >
                Claim prize
              </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default WonPage;
