import { ThemeProvider } from "styled-components";
import Crossword from "react-crossword";
import React from "react";

const CrosswordPage = ({ data, onCrosswordComplete }) => {
  return (
    <div className="content">
      <div style={{ width: "100vw" }}>
        <div className="title">Prize: {data.extra_reward} + {data.reward} NEAR</div>
        <div className="subtitle">The prize in NEAR is sent immediately, the other prize will be processed after NEARCON. <br/>In case of multiple submissions only the first reward will be sent.</div>
        <ThemeProvider
          theme={{
            columnBreakpoint: "9999px",
            gridBackground: "#fff",
            cellBackground: "#8ba9f9",
            cellBorder: "#dfe8fe",
            textColor: "#dae3ff",
            numberColor: "#000000",
            focusBackground: "#346af7",
            highlightBackground: "#779bfc",
          }}
        >
          <Crossword data={data} onCrosswordComplete={onCrosswordComplete} />
        </ThemeProvider>
        <div className="bottom">
          
          <div>
          <div className="subtitle">
            NEAR Partners who helped building puzzles:
          </div>
          
          <section className="slide-option">
          <div id="infinite" class="highway-slider">
            <div className="container highway-barrier">
              <ul className="highway-lane">
                <li className="highway-car">
                  <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/shitzu.jpg" />
                </li>
                <li className="highway-car">
                  <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/qstn.jpg" />
                </li>
                <li className="highway-car">
                  <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/aurora-dev.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/muti.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/playible.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/meta-foxonry.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/neartracker.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/web3mon.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/ref-finance.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/cheddar-farm.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/tamago.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/marmaj.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/open-forest-protocol.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/human-guild.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/open-web-sandbox.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/near-protocol.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/croncat.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/astrodao.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/paras.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/near-misfits.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/near-hub.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/tenk-dao.jpg" />
                </li>


                <li className="highway-car">
                  <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/shitzu.jpg" />
                </li>
                <li className="highway-car">
                  <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/qstn.jpg" />
                </li>
                <li className="highway-car">
                  <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/aurora-dev.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/muti.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/playible.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/meta-foxonry.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/neartracker.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/web3mon.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/ref-finance.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/cheddar-farm.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/tamago.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/marmaj.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/open-forest-protocol.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/human-guild.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/open-web-sandbox.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/near-protocol.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/croncat.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/astrodao.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/paras.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/near-misfits.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/near-hub.jpg" />
                </li>
                <li className="highway-car">
              <img className="sponsor" src="https://awesome-near.s3.amazonaws.com/tenk-dao.jpg" />
                </li>
              </ul>
            </div>
            </div>
            </section>
            <div className="subtitle">
              Brought to you by <a href="https://nearhub.club/" target="_blank">Near Hub</a> - Based on Mike's <a href="https://github.com/mikedotexe/near-crossword" target="_blank">NEAR crossword</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrosswordPage;
