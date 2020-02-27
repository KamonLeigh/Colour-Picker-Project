import React, { Component, useEffect } from 'react';
import DraggableColourList from './DraggableColourList';
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
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { arrayMove } from 'react-sortable-hoc';


const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
}));

function NewPaletteForm({palettes, savePalette }) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [ currentColour, setCurrentColour] = React.useState('');
    const [ colours, setColours] = React.useState([{color:"blue", name:"blue"}]);
    const [ newName, setNewName] = React.useState('');
    const [newPaletteName, setNewPaletteName] = React.useState('');

    const history = useHistory();

    useEffect(() => {
         ValidatorForm.addValidationRule('isColourNameUnique', (value) => {
            const result = colours.every(({ name }) => name.toLowerCase() !== value.toLowerCase());

            if (result) {
                return true;
            }
            return false;
         });

          ValidatorForm.addValidationRule('isColourUnique', (value) => {
            const result = colours.every(({ colour }) => colour !== currentColour);

            if (result) {
                return true;
            }
            return false;
         })

         ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            
             const result = palettes.every(({ paletteName}) => paletteName.toLowerCase() !== value.toLowerCase());

             if (result) {
                 return true;
             }
             return false;
         })
        return () => {
          
        };
    }, [colours, currentColour, palettes])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateCurrentColour = (newColour) => {
        setCurrentColour(newColour.hex);
    };

    const addNewColour = () => {
        const newColour = {
            color: currentColour,
            name: newName
        }

        const newColours = [...colours, newColour];
        setColours(newColours);
        setNewName("");
    };

    const handleChange = (evt) => {
        setNewName(evt.target.value)
    };

    const handleNewPaletteName = (evt) => {
        setNewPaletteName(evt.target.value);
    };

    const handleSubmit = () => {
       let newName = newPaletteName;
       const newPalette = {
            paletteName: newName, 
            colors: colours,
            id: newName.toLowerCase().replace(/ /g,"-")
        };
       savePalette(newPalette);
       history.push("/");
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
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open
              })}
              color="default"
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Persistent drawer
                </Typography>
                <ValidatorForm onSubmit={handleSubmit}>
                    <TextValidator
                        label="palette name"
                        value={newPaletteName}
                        onChange={handleNewPaletteName}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["Enter Palette Name", "Name already taken"]}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Save Palette
                    </Button>
                </ValidatorForm>
              </Toolbar>
            </AppBar>
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
              <Typography variant="h4">Design Your Palette</Typography>
              <div>
                <Button variant="contained" color="secondary">
                    Clear Palette
                </Button>
                <Button variant="contained" color="primary">
                Random colour
                </Button>
              </div>
              <ChromePicker
                color={currentColour}
                onChangeComplete={updateCurrentColour}
              />
              <ValidatorForm onSubmit={addNewColour}>
                <TextValidator 
                    value={newName}
                    onChange={handleChange}
                    validators={[ "required", "isColourNameUnique", "isColourUnique"]}
                    errorMessages = {
                        ["Enter a Colour name", "Colour name must be unique", "Colour already used"]
                    }
                />
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{ backgroundColor: currentColour}}
                 >
                    Add Colour
                </Button>

              </ValidatorForm>
            
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
