import React, { useState } from 'react';
import EntitySelector from './EntitySelector';
import ClassifierSelector from './ClassifierSelector';

function FilterClassifier(props) {
  return (
    <ClassifierSelector
      { ...props }
      placeholder="Filter by Classifier"
    />
  );
}

function ContentSelector(props) {
  const { entities } = props;
  const [ state, setState ] = useState({});

  const onChangeFilterClassifier = (filterClassifiers) => {
    setState(
      (prevState) => ({
        ...prevState,
        filterClassifiers,
      })
    );
  };

  const onChangeContentSelector = (entity) => {
    const { onChange } = props;
    console.log('onChangeContentSelector', entity);
    onChange(entity[0]);
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

  const arrayOr = (array1, array2) => {
    return array1.filter(
      (element) => array2.indexOf(element) !== -1
    )
  };

  return (
    <div className="contentSelector">
      <FilterClassifier
        entities={ visibleClassifiers }
        onChange={ onChangeFilterClassifier }
      />
      <EntitySelector
        { ...props }
        onChange={ onChangeContentSelector }
        entities={
          entities.filter(
            (entity) => {
              const { filterClassifiers: classifiersUserWantsToSee } = state;
              const { classifiersVisible: classifiersThisEntityHasVisible } = entity;
              if (typeof(classifiersUserWantsToSee) === 'undefined' || classifiersUserWantsToSee.length === 0) return true;
              const idsOfClassifiersUserWantsToSee = classifiersUserWantsToSee.map( ({ id: classifierId }) => classifierId );
              const idsOfClassifiersThisEntityHasVisible = classifiersThisEntityHasVisible.map( ({ id: classifierId }) => classifierId );

              return !!arrayOr(idsOfClassifiersUserWantsToSee, idsOfClassifiersThisEntityHasVisible).length;
            }
          )
        }
      />
    </div>
  );
}

export default ContentSelector;
