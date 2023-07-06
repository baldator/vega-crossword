import { ThemeProvider } from "styled-components";
import Crossword from "react-crossword";
import React from "react";

const CrosswordPage = ({ data, onCrosswordComplete }) => {
  return (
    <div className="content">
      <div style={{ width: "100vw" }}>
        <ThemeProvider
          theme={{
            columnBreakpoint: "9999px",
            gridBackground: "transparent",
            cellBackground: "#000000",
            cellBorder: "#FFFFFF",
            textColor: "#FFFFFF",
            numberColor: "#FFFFFF",
            focusBackground: "#087FCF",
            highlightBackground: "#4C4AF0",
          }}
        >
          <Crossword data={data} onCrosswordComplete={onCrosswordComplete} />
        </ThemeProvider>
        <div className="bottom">
          
          <div>
            
            <div className="subtitle">
              A VEGA builders club project
            </div>
          </div>
        </div>
      </div>
      <div id="myModal" className="modal">
      
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>That's not the correct solution. :/..</p>
        </div>
      
      </div>
    </div>
  );
};

export default CrosswordPage;
