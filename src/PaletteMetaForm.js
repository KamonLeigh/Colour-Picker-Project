import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker }from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


function PaletteMetaForm({palettes, handleSubmit, hideForm}) {
    const [stage, setStage] = React.useState('form');
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

    const showEmojiPicker = () => {
      setStage('emoji');
    };

    const savePalette = (emoji) => {
      handleSubmit({paletteName: newPaletteName, emoji: emoji.native});
      setStage("");
    }

    return (
    <div>
      <Dialog open={stage === 'emoji'} onClose={hideForm}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker title="Pick a Palette Emoji" onSelect={savePalette}/>
      </Dialog>
      <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
        <DialogContent>
          <DialogContentText>
           Please enter a name for your new beautiful palette. Make sure it's unique
          </DialogContentText>
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
    </div>      
    )
}

export default PaletteMetaForm;
