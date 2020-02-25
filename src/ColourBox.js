import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import chroma from 'chroma-js';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import './ColourBox.css';


const styles = {
  ColourBox: {
     width:'20%',
     height: props => props.showingFullPalette? "25%" : "50%",
     margin: '0 auto',
     display: 'inline-block',
     position:'relative',
     cursor: 'pointer',
     marginBottom:'-3.5px',
     "&:hover button": {
       opacity: 1,
     },
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white",
  },
  colourName: {
    color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "black"
  },
  seeMore: {
     color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "white",
     background: 'rgba(255, 255, 255, 0.3)',
     position: 'absolute',
     border: 'none',
     right: '0',
     bottom: '0',
     width: '60px',
     height: '30px',
     textAlign: 'center',
     lineHeight: '30px',
     textTransform: 'uppercase'
  },
  copyButton: {
     color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "white",
     width: "100px",
     height: "30px",
     position: "absolute",
     display: "inline-block",
     top: "50% ",
     left: "50% ",
     marginLeft: "-50px",
     marginTop: "-15px",
     textAlign: "center",
     outline: "none",
     background: "rgba(255, 255, 255, 0.3)",
     fontSize: "1rem",
     lineHeight: "30px",
     textTransform: "uppercase",
     border:"none",
     textDecoration: "none",
     opacity:0
  }
};


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
        const {name, background, paletteId, id, showingFullPalette, classes } = this.props;
        const { copied } = this.state;
        const isDarkColour = chroma(background).luminance() <= 0.08;
        const isLightColour = chroma(background).luminance() >= 0.8;
        return (
          <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div style={{ background }} className={classes.ColourBox}>
              <div style={{background}} className={`copy-overlay ${copied && 'show'}`}></div>
              <div className={ `copy-msg ${copied && 'show'}` } >
                <h1>copied!</h1>
                <p className={classes.copyText}>{background}</p>
              </div>
              <div className="copy-container">
                <div className="box-content">
                  <span className={classes.colourName}>{name}</span>
                </div>
                <button className={classes.copyButton}>Copy</button>
              </div>
              {showingFullPalette && (
                  <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                <span className={classes.seeMore}>MORE</span>
              </Link>)}
            </div>
          </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColourBox);