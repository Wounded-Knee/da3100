import React, { useState } from 'react';
import getEntityObject from './classes/getEntityObject';
import {
  ENTITY_TYPE_USER,
  ENTITY_TYPE_CONTENT,
  ENTITY_TYPE_CLASSIFIER,
  ENTITY_TYPE_RATIFICATION,
} from './constants';
import './App.css';

function App() {
  const [entities, setEntities] = useState([]);
  const [viewState, setViewState] = useState({});

  var entityCache = [],
    currentUser = {};

  const test = () => {
    addContent({ text: 'This is a test' }, getEntitiesByType(ENTITY_TYPE_USER)[0]);
  };

  const addUser = (name) => {
    return insertEntity(
      {
        name,
        type: ENTITY_TYPE_USER,
      }
    );
  };

  const addContent = (content, user) => {
    const { id } = insertEntity(
      {
        ...content,
        userID: user.id,
        type: ENTITY_TYPE_CONTENT,
      },
    );
    return getEntityById(id);
  };

  const addClassifier = (classifier, user) => {
    return insertEntity({
      ...classifier,
      userID: user.id,
      type: ENTITY_TYPE_CLASSIFIER,
    });
  };

  const addRatification = (content, classifier, purpose, user) => {
    return insertEntity(
      {
        contentID: content.id,
        classifierID: classifier.id,
        userID: user.id,
        multiplier: purpose ? 1 : -1,
        type: ENTITY_TYPE_RATIFICATION,
      }
    );
  };

  const insertEntity = (newData) => {
    const newID = getEntities().reduce(
      (maxId, { id }) => id > maxId ? id : maxId, 0
    ) + 1;

    const newRecord = {
      ...newData,
      date: new Date(),
      id: newID,
    };

    entityCache = [
      ...entityCache.filter((entityCached) => !entities.find((entityProper) => entityProper.id === entityCached.id)),
      newRecord,
    ];
    setEntities((prevState) => [...prevState, newRecord ]);

    return newRecord;
  };

  const getEntities = () => [ ...entities, ...entityCache ].map(
    (entity) => getEntityObject(entity, {
      getEntitiesByType,
      getEntities,
    })
  );

  const getEntityById = (entityId) => getEntities().find(({ id }) => id === entityId);

  const getEntitiesByType = (targetType) => getEntities().filter(({ type }) => type === targetType);

  const getContent = () => getEntitiesByType(ENTITY_TYPE_CONTENT);

  const setup = () => {
    console.log('Setting up');
    const userBob = addUser('Bob');
    const userSue = addUser('Sue');
    const contentTest = addContent({ text: 'Test' }, userBob);
    const classNeutral = addClassifier({ text: 'Neutral' }, userBob);
    addClassifier({ text: 'Negative' }, userBob);
    addClassifier({ text: 'Positive' }, userBob);
    const classBlue = addClassifier({ text: 'Blue' }, userBob);
    addRatification(contentTest, classNeutral, true, userBob);
    addRatification(contentTest, classBlue, true, userBob);
    addRatification(contentTest, classBlue, false, userSue);
    currentUser = userBob;
  };

  // Initialize Data
  if (getEntities().length === 0) {
    setup();
  }

  console.log(`${getEntities().length} Entities: `, getEntities());
  return (
    <>
      <div id="views">
        {
          getEntitiesByType(ENTITY_TYPE_CLASSIFIER).map(({ text, id }) => (
            <button
              onClick={ () => {
                setViewState((prevViewState) => ({
                  ...prevViewState,
                  [id]: !prevViewState[id],
                }))
              }}
              className={
                viewState[id] ? 'visible' : 'invisible'
              }
            >
              { text }
            </button>
          ))
        }
      </div>
      <ul>
        {
          getContent()
            .filter(
              ({ classifiers }) => {
                const x = classifiers
                  .filter(
                    ({ visible, id }) => (
                      visible && viewState[id]
                    ) || (
                      !visible && Object.keys(viewState).reduce((acc, bool) => acc + (bool ? 1 : 0), 0) === 0
                    )
                  );
                return x.length;
              }
            )
            .map(
              ({ id: contentId, text, classifiers }) => (
                <li key={ contentId }>
                  { text }
                  { classifiers &&
                    <ul className="classifiers">
                      {
                        classifiers.map(
                          ({ id, text, visible }) => (
                            <li
                              className={ visible ? "visible" : "invisible" }
                              key={ id }
                            >
                              { text }
                              <button onClick={ () => addRatification({ id: contentId }, { id }, true, currentUser) }>Ratify</button>
                            </li>
                          )
                        )
                      }
                    </ul>
                  }
                </li>
              )
            )
        }
      </ul>
      <button onClick={ test }>Test</button>
    </>
  );
}

export default App;
