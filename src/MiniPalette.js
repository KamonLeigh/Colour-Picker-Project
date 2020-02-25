import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles'

function MiniPalette(props) {
    const {classes, paletteName, emoji, colors} = props;
    const miniColourBoxes = colors.map(color => (
        <div 
         className={classes.miniColour} 
         style={{ backgroundColor: color.color}}
         key={color.name}
        >
        </div>
    ));

    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colours}>{miniColourBoxes}</div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )
}
export default withStyles(styles)(MiniPalette);