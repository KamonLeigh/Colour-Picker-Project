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