import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import chroma from 'chroma-js';
import { Link } from 'react-router-dom';
import './ColourBox.css';

class ColourBox extends Component {
    constructor(props) {
        super(props) 
            this.state = {
                copied: false,
            }
        this.changeCopyState = this.changeCopyState.bind(this);
        
    }

    changeCopyState() {
        this.setState({ copied: true}, () => {
            setTimeout(() => this.setState( {copied: false }), 1500);
        })
    }

    render() {
        const {name, background, paletteId, id, showLink } = this.props;
        const { copied } = this.state;
        const isDarkColour = chroma(background).luminance() <= 0.08;
        const isLightColour = chroma(background).luminance() >= 0.8;
        return (
          <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div style={{ background }} className="ColourBox">
              <div style={{background}} className={`copy-overlay ${copied && 'show'}`}></div>
              <div className={ `copy-msg ${copied && 'show'}` } >
                <h1>copied!</h1>
                <p className={isLightColour && 'dark-text'}>{background}</p>
              </div>
              <div className="copy-container">
                <div className="box-content">
                  <span className={isDarkColour? "light-text" : ""}>{name}</span>
                </div>
                <button className={`copy-button ${isLightColour && "dark-text"}`}>Copy</button>
              </div>
              {showLink && (
                  <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                <span className={ `see-more ${isLightColour? "dark-text" : ""}` }>MORE</span>
              </Link>)}
            </div>
          </CopyToClipboard>
        );
    }
}

export default ColourBox;