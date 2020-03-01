import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


function PaletteMetaForm({palettes, handleSubmit}) {
    const [open, setOpen] = React.useState(false);
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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
            
    )
}

export default PaletteMetaForm;
