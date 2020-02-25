import React from 'react'
import { withStyles } from "@material-ui/styles";


const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer'
    }
}

 function DraggableColourBox({colour, name, classes}) {
    return (
        <div className={classes.root} style={{ backgroundColor: colour}}>
           { name }
        </div>
    )
};

export default withStyles(styles)(DraggableColourBox);
