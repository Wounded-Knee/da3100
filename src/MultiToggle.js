import React, { useState } from 'react';

const pseudoToggle = (low,high,val,inc) => {
  const newVal = val+inc;
  if (newVal > high) return low;
  if (newVal < low) return high;
  return newVal;
};

const MultiToggle = ({ onChange=()=>{}, className, children, arrayStates, currentStateIndex=0 }) => {
  const [state, setState] = useState(currentStateIndex);
  const nextStateIndex = pseudoToggle(0,arrayStates.length-1,state,1);
  const text = arrayStates[state];
  const onClick = () => {
    setState(() => nextStateIndex);
    onChange({
      index: nextStateIndex,
      item: arrayStates[nextStateIndex],
      arrayStates,
    });
  };

  return (
    <div
      className={ `MultiToggle ${className} state${state}` }
      onClick={ onClick }
      title={ text }
    >
      { children }
    </div>
  );
}

export default MultiToggle;
