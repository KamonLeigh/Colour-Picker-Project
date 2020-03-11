import sizes from './sizes';
import chroma from 'chroma-js';


export default {
    root: {
            width: '20%',
            height: '25%',
            margin: '0 auto',
            display: 'inline-block',
            position: 'relative',
            cursor: 'pointer',
            "&:hover svg": {
                color: "white",
                transform: "scale(1.5)",
            },
            [sizes.down("lg")]: {
                width:"20%",
                height:"20%",
            },
            [sizes.down("md")]: {
                width: "50%",
                height: "10%",
            },
            [sizes.down("sm")]: {
                width: "100%",
                height: "5%",
            }
        },
        boxContent: {
            position: "absolute",
            padding: "10px",
            width: "100%",
            left: "0px",
            bottom: "0px",
            color: props => chroma(props.colour).luminance() <= 0.08 ? "white" : "black",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontSize: "12px",
            display: 'flex',
            justifyContent: 'space-between'
        },
        deleteIcon: {
            transition: "all 0.3s ease-in-out"

        }
}