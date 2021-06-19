import React, { useState } from 'react';
import EntitySelector from './EntitySelector';
import ClassifierSelector from './ClassifierSelector';

function FilterClassifier({ entities, onChange }) {
  return (
    <ClassifierSelector
      entities={ entities }
      onChange={ onChange }
      placeholder="Filter by Classifier"
    />
  );
}

function ContentSelector(props) {
  const { entities } = props;
  const [ state, setState ] = useState({});

  const onChangeFilterClassifier = (filterClassifiers) => setState(
    (prevState) => ({
      ...prevState,
      filterClassifiers,
    })
  );

  const onChangeContentSelector = (entity) => {
    const { onChange = () => {} } = props;
    console.log(entity);
    onChange(entity);
  };

  const visibleClassifiers = entities.reduce(
    (collection, { classifiersVisible }) => {
      return [
        ...collection.filter(({ id }) => {
          const classifiersVisibleIds = classifiersVisible.map(({ id }) => id);
          return classifiersVisibleIds.indexOf(id) === -1;
        }),
        ...classifiersVisible,
      ];
    }, []
  );

  return (
    <div className="contentSelector">
      <FilterClassifier
        entities={ visibleClassifiers }
        onChange={ onChangeFilterClassifier }
      />
      <EntitySelector
        { ...props }
        selectProps={{
          onChange: onChangeContentSelector
        }}
        entities={
          entities.filter(
            ({ id: entityId }) => {
              const { filterClassifiers } = state;
              if (!filterClassifiers) return true;
              return filterClassifiers.map( ({ id: classifierId }) => classifierId ).includes(entityId) || []
            }
          )
        }
      />
    </div>
  );
}

export default ContentSelector;
