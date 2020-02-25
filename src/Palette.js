import React, { Component} from 'react';
import { withStyles } from "@material-ui/styles";
import ColourBox from './ColourBox';
import Navbar from './NavBar';
import PaltteFooter from './PaletteFooter';
import './Palette.css';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        },
    colour: {
        height: "90%"
    }
}

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state ={
            level: 500,
            format: 'hex'
        };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);

    }

    changeLevel(newLevel){
        this.setState({
            level: newLevel
        })
    }

    changeFormat(value) {
        this.setState({
            format: value
        })
    }

    render() {
        const { colors, paletteName, emoji, id} = this.props.palette;
        const { level, format } = this.state;
        const { classes } = this.props;

        const colourBoxes = colors[level].map(color => (
            <ColourBox 
                background={color[format]} 
                name={color.name} 
                key={color.id} 
                id={color.id}
                paletteId={id}
                showLink={true}
                showingFullPalette={true}
             />
        ));
        return (
        <div className={classes.Palette}>
           <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showSlider={true} />

           {/* Navbar goes here*/}
            <div className={classes.colour}>
            {colourBoxes}
            </div>
          <PaltteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
        )
    }
}

export default withStyles(styles)(Palette);