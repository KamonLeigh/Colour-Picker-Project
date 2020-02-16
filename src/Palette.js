import React, { Component} from 'react';
import ColourBox from './ColourBox';
import Navbar from './NavBar';
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state ={
            level: 500
        };
        this.changeLevel = this.changeLevel.bind(this)

    }

    changeLevel(newLevel){
        this.setState({
            level: newLevel
        })
    }

    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;

        const colourBoxes = colors[level].map(color => (
            <ColourBox background={color.hex} name={color.name}/>
        ));
        return (
        <div className="Palette">
           <Navbar level={level} changeLevel={this.changeLevel}/>
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