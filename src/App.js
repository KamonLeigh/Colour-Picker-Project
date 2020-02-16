import React from 'react';
import Palette from './Palette';
import seedColours from './seedColours'
import { generatePalette } from './colourHelpers';


import './App.css';

function App() {
  return (
    <div className="App">
      <Palette  palette={generatePalette(seedColours[4])}/>
    </div>
  );
}

export default App;
