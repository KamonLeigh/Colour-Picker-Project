import React, { useState } from 'react';
import PaletteList from './PaletteList';
import SingleColourPalette from './SingleColourPalette';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import {Route, Switch } from 'react-router-dom'
import seed from './seedColours'
import { generatePalette } from './colourHelpers';


import './App.css';

function App() {
  const [seedColours, setSeedColours] = useState(seed)
  function findPalette(id) {
    return seedColours.find((palette) => {
      return palette.id === id;
    })
  }

  function savePalette(newPalette) {
    setSeedColours([...seedColours, newPalette])
  }
  return (
    <Switch>
      <Route exact path="/palette/new" render={() => <NewPaletteForm savePalette={savePalette}/>}/>
      <Route exact path="/" render={(renderProps) => <PaletteList palettes={seedColours} {...renderProps}/>} />
      <Route 
       exact
       path="/palette/:id" 
       render={routerProps => <Palette 
        palette={generatePalette(findPalette(routerProps.match.params.id))}/>} 
        />
       <Route
        exact
        path="/palette/:paletteId/:colourId"
        render={(routerProps) =>  
          <SingleColourPalette 
           palette={generatePalette(findPalette(routerProps.match.params.paletteId))}
           colourId={routerProps.match.params.colourId}
           />} 
        />
    </Switch>

    // <div className="App">
    //   <Palette  palette={generatePalette(seedColours[4])}/>
    // </div>
  );
}

export default App;
