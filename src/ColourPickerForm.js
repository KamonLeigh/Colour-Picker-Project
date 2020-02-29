import React, {useEffect} from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color'
import { Button } from '@material-ui/core';

function ColourPickerForm({paletteIsFull, addNewColour, colours}) {
    const [currentColour, setCurrentColour] = React.useState('teal');
    const [newName, setNewName] = React.useState('');


    useEffect(() => {
        ValidatorForm.addValidationRule('isColourUnique', (value) => {
            const result = colours.every(({ colour }) => colour !== currentColour);

            if (result) {
                return true;
            }
            return false;
         })

          ValidatorForm.addValidationRule('isColourNameUnique', (value) => {
              const result = colours.every(({
                  name
              }) => name.toLowerCase() !== value.toLowerCase());

              if (result) {
                  return true;
              }
              return false;
          });

        
    }, [currentColour, colours])

     const updateCurrentColour = (newColour) => {
         setCurrentColour(newColour.hex);
     };

     const handleChange = (evt) => {
         setNewName(evt.target.value)
     };

     const handleSubmit = () => {
         const newColour = {
             color: currentColour,
             name: newName
         };
         addNewColour(newColour);
         setNewName('');
     }



    return (
        <div>
            <ChromePicker
                color={currentColour}
                onChangeComplete={updateCurrentColour}
              />
              <ValidatorForm onSubmit={handleSubmit}>
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
                    style={{ backgroundColor: paletteIsFull ? 'grey' : currentColour}}
                    disabled={paletteIsFull}
                 >
                 { paletteIsFull ? "Palette Full" : "Add Colour"}
                </Button>

              </ValidatorForm>     

        </div>
    )
}

export default ColourPickerForm
