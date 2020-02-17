import React from 'react';
import {Route, Switch } from 'react-router-dom'
import Palette from './Palette';
import seedColours from './seedColours'
import { generatePalette } from './colourHelpers';


import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>PALETTE</h1>} />
      <Route exact path="/palette/:id" render={() => <h1>SINGLE PALETTE</h1>} />
    </Switch>

    // <div className="App">
    //   <Palette  palette={generatePalette(seedColours[4])}/>
    // </div>
  );
}

export default App;
