import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import './ColourBox.css';

class ColourBox extends Component {
    render() {
        const {name, background } = this.props;
        return (
          <CopyToClipboard text={background}>
            <div style={{ background }} className="ColourBox">
              <div className="copy-container">
                <div className="box-content">
                  <span>{name}</span>
                </div>
                <button className="copy-button">Copy</button>
              </div>
              <span className="see-more">More</span>
            </div>
          </CopyToClipboard>
        );
    }
}

export default ColourBox;