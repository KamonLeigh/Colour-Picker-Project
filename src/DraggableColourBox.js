import React from 'react'
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";


const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        "&:hover svg": {
            color: "white",
            transform:"scale(1.5)",
        }
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0px",
        bottom: "0px",
        color: "rgba(0, 0, 0, 0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: 'flex',
        justifyContent:'space-between'
    },
    deleteIcon: {
       transition: "all 0.3s ease-in-out"

    }
}

 function DraggableColourBox({colour, name, classes}) {
    return (
        <div className={classes.root} style={{ backgroundColor: colour}}>
            <div className={classes.boxContent}>
                <span>{ name }</span>
               <DeleteIcon className={classes.deleteIcon}/>
            </div>
        </div>
    )
};

export default withStyles(styles)(DraggableColourBox);
