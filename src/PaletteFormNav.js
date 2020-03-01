import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

const drawerWidth = 400;

const useStyles = makeStyles(theme =>({
    root: {
        display: 'flex'
    },
    appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            flexDirection:'row',
            justifyContent:'space-between',
            height:'64px',
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
        navBtns:{}
}));

function PaletteFormNav({open, palettes, handleSubmit, handleDrawerOpen}) {
    const classes = useStyles();
    const theme = useTheme();
    const [newPaletteName, setNewPaletteName] = React.useState('');
    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            
             const result = palettes.every(({ paletteName}) => paletteName.toLowerCase() !== value.toLowerCase());

             if (result) {
                 return true;
             }
             return false;
         })
        
    }, [palettes])

    const handleNewPaletteName = (evt) => {
        setNewPaletteName(evt.target.value);
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
                  Create a Palette
                </Typography>
              </Toolbar>
               <div className={classes.navBtns}>
                    <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
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
                    <Link to="/">
                        <Button 
                            variant="contained" 
                            color="secondary"
                        >
                            Go Back
                        </Button>
                    </Link>
                </div>  
            </AppBar>
        </div>
    )
}

export default PaletteFormNav;
