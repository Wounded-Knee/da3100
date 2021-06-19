import React from 'react';
import Select from 'react-select'

function EntitySelector({ placeholder="Entity Selector", entities, selectProps={}, onChange=()=>{} }) {
  const
    selectedOptionToArray = (options) => options instanceof Array ? options : [options],
    optionsToEntities = (options) => selectedOptionToArray(options).map(optionToEntity),
    entitiesToOptions = (entities) => entities.map(entityToOption),
    entityToOption = ({ id: value, text: label }) => ({ value, label }),
    optionToEntity = ({ value: optionId }) => entities.find(({ id: entityId }) => entityId === optionId);

  return (
    <Select
      { ...selectProps }
      onChange={ (options) => onChange(optionsToEntities(options)) }
      placeholder={ placeholder }
      options={ entitiesToOptions(entities) }
    />
  );
}

export default EntitySelector;
