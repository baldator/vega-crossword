import { ThemeProvider } from "styled-components";
import Crossword from "react-crossword";
import React from "react";

const CrosswordPage = ({ data, onCrosswordComplete }) => {
  return (
    <div className="content">
      <div style={{ width: "100vw", textAlign: "center" }}>
        <h3>Select Crossword</h3>
          <a href="https://scavenger-hunt.vega.win/1">Vega Scavenger Hunt #1</a> -
          <a href="https://scavenger-hunt.vega.win/2">Vega Scavenger Hunt #2</a> -
          <a href="https://scavenger-hunt.vega.win/3">Vega Scavenger Hunt #3</a> -
          <a href="https://scavenger-hunt.vega.win/4">Vega Scavenger Hunt #4</a> 
      </div>
      <div style={{ width: "100vw" }}>
        <ThemeProvider
          theme={{
            columnBreakpoint: "9999px",
            gridBackground: "transparent",
            cellBackground: "transparent",
            cellBorder: "#000000",
            textColor: "#000000",
            numberColor: "#000000",
            focusBackground: "#0cf779",
            highlightBackground: "#95fd32",
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
    </div>
  );
};

export default CrosswordPage;
