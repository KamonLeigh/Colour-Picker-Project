import React, { Component} from 'react';
import ColourBox from './ColourBox';
import './Palette.css';

class Palette extends Component {
    render() {
        const colourBoxes = this.props.palette.colors[300].map(color => (
            <ColourBox background={color.hex} name={color.name}/>
        ));
        return (
        <div className="Palette">
           {/* Navbar goes here*/}
            <div className="Palette-colours">
            {colourBoxes}
            </div>
             { /* footer eventually */ }
        </div>
        )
    }
}

export default Palette