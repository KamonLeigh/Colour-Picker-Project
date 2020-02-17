import React from 'react';
import PaletteList from './PaletteList';
import Palette from './Palette';
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
      <Route exact path="/" render={() => <PaletteList palettes={seedColours}/>} />
      <Route 
       exact
       path="/palette/:id" 
       render={routerProps => <Palette palette={generatePalette(findPalette(routerProps.match.params.id))}/>} />
    </Switch>

    // <div className="App">
    //   <Palette  palette={generatePalette(seedColours[4])}/>
    // </div>
  );
}

export default App;
