import React, { Component} from 'react';
import ColourBox from './ColourBox';
import './Palette.css';

class Palette extends Component {
    render() {
        const colourBoxes = this.props.colors.map(color => (
            <ColourBox background={color.color} name={color.name}/>
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