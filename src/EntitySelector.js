//import React, { Component } from 'react'
import Select from 'react-select'

function EntitySelector({ label, entities, selectProps={} }) {
  const options = entities.map(
    ({ id, text }) => ({
      value: id,
      label: text,
    })
  );

  return <>
    <div>{ label || "EntitySelector" }</div>
    <Select
      { ...selectProps }
      options={ options }
    />
  </>;
}

export default EntitySelector;
