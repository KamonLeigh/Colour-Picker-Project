import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker }from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


function PaletteMetaForm({palettes, handleSubmit, hideForm}) {
    const [open, setOpen] = React.useState(true);
    const [newPaletteName, setNewPaletteName] = React.useState('');


    const handleNewPaletteName = (evt) => {
        setNewPaletteName(evt.target.value);
    }


    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {

            const result = palettes.every(({
                paletteName
            }) => paletteName.toLowerCase() !== value.toLowerCase());

            if (result) {
                return true;
            }
            return false;
        })

    }, [palettes])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
   
      <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
           Please enter a name for your new beautiful palette. Make sure it's unique
          </DialogContentText>
            <Picker/>
            <TextValidator
                label="palette name"
                value={newPaletteName}
                fullWidth
                marign="normal"
                onChange={handleNewPaletteName}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already taken"]}
            /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            Cancel
          </Button>
          <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Save Palette
            </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
            
    )
}

export default PaletteMetaForm;
