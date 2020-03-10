import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
    const {classes, paletteName, emoji, colors, openDialog, id} = props;
    const miniColourBoxes = colors.map(color => (
        <div 
         className={classes.miniColour} 
         style={{ backgroundColor: color.color}}
         key={color.name}
        >
        </div>
    ));
    
    function deletePalette(evt) {
        evt.stopPropagation();
        openDialog(id)

    }
    return (
        <div className={classes.root} onClick={props.handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon} 
                    style={{transition: "all 0.3s ease-in-out"}}
                    onClick={deletePalette}
                 />
            
            <div className={classes.colours}>{miniColourBoxes}</div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )
}
export default withStyles(styles)(MiniPalette);