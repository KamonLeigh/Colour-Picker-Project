import React from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColourPickerForm from './ColourPickerForm'
import DraggableColourList from './DraggableColourList';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { arrayMove } from 'react-sortable-hoc';


const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        display:'flex',
        alignItems:'center'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height:"calc(100vh - 64px)",
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    container: {
        width:"90%",
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    buttons: {
        width: '100%',
    },
    button: {
        width: '50%'
    }
}));

function NewPaletteForm({palettes, savePalette, maxColours = 20 }) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [ colours, setColours] = React.useState(palettes[0].colors);
   

    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

   
    const addNewColour = (newColour) => {
        const newColours = [...colours, newColour];
        setColours(newColours);
    };


    const handleSubmit = (newPaletteName) => {
       const newPalette = {
            paletteName: newPaletteName,
            colors: colours,
            id: newPaletteName.toLowerCase().replace(/ /g,"-")
        };
       savePalette(newPalette);
       history.push("/");
    }

    const clearColours = () => {
        setColours([]);
    }

    const addRandomColour = () => {
        // Pick colour from existing palette
        const allColours = palettes.map(p => p.colors).flat();
        const rand = Math.floor(Math.random() * allColours.length);
        const randomColour = allColours[rand];
        setColours(c => [...c, randomColour]);
    }

    const removeColour = (colourName) => {
        const newColours = colours.filter(colour => colour.name !== colourName);
        setColours(newColours);

    }

   const onSortEnd = ({oldIndex, newIndex }) => {
        setColours( c => arrayMove(c, oldIndex, newIndex))
    }


        return (
          <div className={classes.root}>
           
            <PaletteFormNav 
                open={open} 
                palettes={palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen }
             />
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <div className={classes.container}>
              <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
              <div className={classes.buttons}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={clearColours}
                    className={classes.button}
                   >
                    Clear Palette
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={addRandomColour}
                    disabled={colours.length >= maxColours}
                    className={classes.button}
                 >
                Random colour
                </Button>
              </div>
              <ColourPickerForm
                paletteIsFull={colours.length >= maxColours}
                addNewColour={addNewColour}
                colours={colours}
              />
              </div>
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.drawerHeader} />
    
               <DraggableColourList 
                    colours={colours} 
                    removeColour={removeColour}
                    axis='xy'
                    onSortEnd={onSortEnd}
                />
              
            </main>
          </div>
        );
    }


export default NewPaletteForm;
