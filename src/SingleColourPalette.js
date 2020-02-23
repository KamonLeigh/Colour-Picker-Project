import React, { Component } from 'react';
import ColourBox from './ColourBox.js'
import color from '@material-ui/core/colors/amber';

export default class SingleColourPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colourId);
        this.state = {
            shades: [],

        };
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

        console.log(shades)
        

        return shades.slice(1);
    }

    render() {
    
       const colourBoxes = this._shades.map(color => (
            <ColourBox
                key={color.name}
                name={color.name}
                background={color.hex}
                showingFullPalette={false}
            />
            ));
        return (
            <div className="Palette">
                <h1>Single Colour Component</h1>
                <div className="Palette-colours">
                    {colourBoxes}
                </div>
            </div>
        )
    }
}
