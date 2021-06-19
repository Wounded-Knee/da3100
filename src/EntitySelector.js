import React from 'react';
import { AccessorContext } from './App';
import Select from 'react-select'

function EntitySelector({ placeholder="Entity Selector", entities, selectProps={}, onChange=()=>{} }) {
  const
    { getEntityById } = React.useContext(AccessorContext),
    entityToOption = ({ id: value, text: label }) => ({ value, label }),
    optionToEntity = ({ value: id }) => getEntityById(id);

  return (
    <Select
      { ...selectProps }
      onChange={ (option) => onChange(optionToEntity(option)) }
      placeholder={ placeholder }
      options={ entities.map(entityToOption) }
    />
  );
}

export default EntitySelector;
