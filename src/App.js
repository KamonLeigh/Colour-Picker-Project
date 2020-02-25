import React from 'react';
import PaletteList from './PaletteList';
import SingleColourPalette from './SingleColourPalette';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import {Route, Switch } from 'react-router-dom'
import seedColours from './seedColours'
import { generatePalette } from './colourHelpers';


import './App.css';

function App() {

  function findPalette(id) {
    return seedColours.find((palette) => {
      return palette.id === id;
    })
  }
  return (
    <Switch>
      <Route exact path="/palette/new" render={() => <NewPaletteForm/>}/>
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
