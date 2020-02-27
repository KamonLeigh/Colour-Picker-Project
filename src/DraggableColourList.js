import React from 'react'
import DraggableColourBox from './DraggableColourBox';
import {SortableContainer } from 'react-sortable-hoc';

function DraggableColourList({colours, removeColour}) {
    return (
      <div style={{height:'100%'}}>
        {colours.map((colour, i )=> (
          <DraggableColourBox
            key={colour.name}
            colour={colour.color}
            name={colour.name}
            index={i}
            handleClick={() => removeColour(colour.name)}
          />
        ))}
      </div>
    );
}

export default SortableContainer(DraggableColourList);
