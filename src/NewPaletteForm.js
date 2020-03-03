import React from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColourPickerForm from './ColourPickerForm'
import DraggableColourList from './DraggableColourList';
import useStyles from './styles/NewPaletteFormStyles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
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


    const handleSubmit = ({paletteName, emoji}) => {
       const newPalette = {
            paletteName,
            colors: colours,
            id: paletteName.toLowerCase().replace(/ /g,"-"),
            emoji,
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
