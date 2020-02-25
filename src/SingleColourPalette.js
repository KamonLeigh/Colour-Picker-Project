import React, { Component } from 'react';
import ColourBox from './ColourBox.js'
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import color from '@material-ui/core/colors/amber';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";


const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colour: {
        height: "90%"
    },
    goBack: {
        width: '20%',
        height: "50%",
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        opacity: 1,
        backgroundColor:"black",
        "& a": {
            color:"white",
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
            border: "none",
            textDecoration: "none",
        }
    },

}
 class SingleColourPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colourId);
        this.state = {
            format: "hex",
        };
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colourToFilterBy) {
        console.log({
            palette,
            colourToFilterBy
        })
        // return all shades of given colour
        let shades =[]
        let allColours = palette.colors;

        for (let key in allColours) {
            shades = shades.concat(
                allColours[key].filter(colour => colour.id === colourToFilterBy)
            )
        }
        

        return shades.slice(1);
    }

    changeFormat(value) {
        this.setState({
            format: value
        })
    }

    render() {
        const { format } = this.state;
        const { paletteName, emoji, id} = this.props.palette;
        const { classes } = this.props;
   
    
       const colourBoxes = this._shades.map(color => (
            <ColourBox
                key={color.name}
                name={color.name}
                background={color[format]}
                showingFullPalette={false}
            />
            ));
        return (
            <div className={classes.Palette}>
                <NavBar handleChange={this.changeFormat}/>
                <div className={classes.colour}>
                    {colourBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className="back-button">GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColourPalette);
