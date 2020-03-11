import React from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColourPickerForm from './ColourPickerForm'
import DraggableColourList from './DraggableColourList';
import useStyles from './styles/NewPaletteFormStyles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { arrayMove } from 'react-sortable-hoc';
import seed from './seedColours'





function NewPaletteForm({palettes, savePalette, maxColours = 20 }) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [ colours, setColours] = React.useState(seed[0].colors);
   

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
        let rand;
        let randomColour;
        let isDuplicateColour = true
        while(isDuplicateColour) {
          rand = Math.floor(Math.random() * allColours.length);
          randomColour = allColours[rand];
          isDuplicateColour = colours.some(colour => colour.name === randomColour.name)
        }
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
                    distance={20}
                />
              
            </main>
          </div>
        );
    }


export default NewPaletteForm;
