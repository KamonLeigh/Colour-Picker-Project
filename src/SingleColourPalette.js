import React, { Component } from 'react';
import ColourBox from './ColourBox.js'
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";



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
