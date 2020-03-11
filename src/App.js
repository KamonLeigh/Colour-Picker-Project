import React, { useState, useEffect } from 'react';
import PaletteList from './PaletteList';
import Page from './Page';
import SingleColourPalette from './SingleColourPalette';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Route, Switch } from 'react-router-dom'
import seed from './seedColours'
import { generatePalette } from './colourHelpers';




import './App.css';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [seedColours, setSeedColours] = useState(savedPalettes || seed);



  useEffect(() => {
  window.localStorage.setItem('palettes', JSON.stringify(seedColours));

  }, [seedColours])

  function findPalette(id) {
    return seedColours.find((palette) => {
      return palette.id === id;
    })
  }

  function removePalette(id) {
    setSeedColours( prevState => prevState.filter(palette => palette.id !== id));
  }

  function savePalette(newPalette) {
    setSeedColours([...seedColours, newPalette]);
  
  }

  return (
    <Route
     render={({location}) => (
      <TransitionGroup>
        <CSSTransition  key={location.key} classNames="page" timeout={5000}>
          <Switch>
            <Route 
              exact 
              path="/palette/new" 
              render={() => 
                <Page>
                  <NewPaletteForm 
                    savePalette={savePalette} 
                    palettes={seedColours}
                  />
                </Page>
                }/>
            <Route 
                exact 
                path="/" 
                render={(renderProps) => 
                  <Page>
                    <PaletteList 
                      palettes={seedColours} 
                      {...renderProps} 
                      removePalette={removePalette}
                    />
                 </Page>
                }/>
            <Route 
            exact
            path="/palette/:id" 
            render={routerProps => 
              <Page>
              <Palette 
              palette={generatePalette(findPalette(routerProps.match.params.id))}
              />
            </Page>
            } 
              />
            <Route
              exact
              path="/palette/:paletteId/:colourId"
              render={(routerProps) =>  
                <Page>
                  <SingleColourPalette 
                  palette={generatePalette(findPalette(routerProps.match.params.paletteId))}
                  colourId={routerProps.match.params.colourId}
                  />
               </Page>
              } 
              />
              <Route 
                render={(renderProps) => 
                  <Page>
                    <PaletteList 
                      palettes={seedColours} 
                      {...renderProps} 
                      removePalette={removePalette}
                    />
                 </Page>
                }/>
            <Route/> 
           </Switch>
          </CSSTransition>
     </TransitionGroup>

    )}
    
    
    />



    // <div className="App">
    //   <Palette  palette={generatePalette(seedColours[4])}/>
    // </div>
  );
}

export default App;
