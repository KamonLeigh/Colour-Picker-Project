import React from 'react'
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";

import DeleteIcon from "@material-ui/icons/Delete";
import styles from './styles/DraggableColourBox';

 const DraggableColourBox = SortableElement((props) => {
     const { colour, name, classes, handleClick} = props;
    return (
        <div className={classes.root} style={{ backgroundColor: colour}}>
            <div className={classes.boxContent}>
                <span>{ name }</span>
               <DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>
    )
});

export default withStyles(styles)(DraggableColourBox);
