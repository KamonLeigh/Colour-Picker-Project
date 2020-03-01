import React, { useEffect } from 'react';
import PaletteMetaForm from './PaletteMetaForm';
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

                    <PaletteMetaForm 
                        palettes={palettes}
                        handleSubmit={handleSubmit}
                        />
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
