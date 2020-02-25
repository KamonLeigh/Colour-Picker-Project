import React, { Component } from 'react';
import ColourBox from './ColourBox.js'
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import color from '@material-ui/core/colors/amber';
import { Link } from 'react-router-dom';

export default class SingleColourPalette extends Component {
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
   
    
       const colourBoxes = this._shades.map(color => (
            <ColourBox
                key={color.name}
                name={color.name}
                background={color[format]}
                showingFullPalette={false}
            />
            ));
        return (
            <div className="SingleColourPalette Palette">
                <NavBar handleChange={this.changeFormat}/>
                <div className="Palette-colours">
                    {colourBoxes}
                    <div className="go-back ColourBox">
                        <Link to={`/palette/${id}`} className="back-button">GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}
