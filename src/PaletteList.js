import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100%",
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"center"
    },
    container: {
        width: "50%",
        display:"flex",
        alignItems: "flex-start",
        flexDirection:"column",
        flexWrap: "ok",

    },
    nav: {
         display: "flex",
         width: "100%",
         justifyContent: "space-between",
         color:"white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"

    }
}


class PaletteList extends Component {
    render() {
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
                <div classes={classes.container}>
                    <nav classes={classes.nav}>
                        <h1 classes={classes.nav} >Colours Palette</h1>
                    </nav>
                    <div className={classes.palettes}>
                      {palettes.map(palette => (
                            <MiniPalette {...palette}/>
                        ))} 
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);