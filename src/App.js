import React, { useState } from 'react';
import ContentView from './ContentView';
import getEntityObject from './classes/getEntityObject';
import {
  ENTITY_TYPE_USER,
  ENTITY_TYPE_CONTENT,
  ENTITY_TYPE_CLASSIFIER,
  ENTITY_TYPE_RATIFICATION,
} from './constants';
import './App.css';
import ContentSelector from './ContentSelector';
export const AccessorContext = React.createContext();

function App() {
  const [entities, setEntities] = useState([]);
  const [viewState, setViewState] = useState({});

  var entityCache = [],
    currentUser = {};

  const test = () => {
    addContent({ text: 'This is a test' }, getEntitiesByType(ENTITY_TYPE_USER)[0]);
  };

  const addUser = (userData) => {
    return insertEntity(
      {
        ...userData,
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
      getEntityById,
    })
  );

  const getEntityById = (entityId) => getEntities().find(({ id }) => id === entityId);

  const getEntitiesByType = (targetType) => getEntities().filter(({ type }) => type === targetType);

  const getContent = () => getEntitiesByType(ENTITY_TYPE_CONTENT);

  const setup = () => {
    console.log('Setting up');

    const honesty = [
      { val: 1, label: 'honest' },
      { val: 0.9, label: 'faithful' },
      { val: 0.5, label: 'fair' },
      { val: 0.2, label: 'fool' },
      { val: 0, label: 'liar' },
    ];

    const users = [
      'Noah Gibson',
      'Holly Weaver',
      'Sergio Cummings',
      'Emily Duncan',
      'Megan Bowen',
      'Andrew Dunn',
      'Saul Cohen',
      'Carole Ortega',
      'Arnold Erickson',
      'Robin Hudson',
      'Ken Barrett',
      'Stanley Fields',
      'Jennie Silva',
      'Tamara Ball',
      'Mabel Poole',
      'Mae Gibson',
      'Philip Reese',
      'Angel Jensen',
      'Sam Bell',
      'Earnest Benson',
      'Jean Dixon',
      'Terry Lucas',
      'Juanita Lawson',
      'Hugh Hines',
      'Doris Floyd',
      'Leslie Gibbs',
      'Elias Daniels',
      'Norman Mack',
      'Lillie Valdez',
      'Alyssa Douglas',
      'Paula Owen',
      'Faith Summers',
      'Jorge Tran',
      'Casey Fletcher',
      'Isabel Mccarthy',
      'Domingo Crawford',
      'Devin Bennett',
      'Karla Young',
      'Jacob Romero',
      'Shelia Weaver',
      'Terry Moody',
      'Hubert Bryan',
      'Adam Goodwin',
      'Juan Parks',
      'Doreen Pearson',
      'Alvin Hampton',
      'Elsa Little',
      'Sonia Dean',
      'Doug Rodriguez',
      'Salvador Sherman',
      'Debbie Martin',
      'Arthur Lawrence',
      'Joanna Hall',
      'Kristina Henry',
      'Eddie Cain',
      'Kathryn Parker',
      'Natalie Blake',
      'Ollie Conner',
      'Francis Ray',
      'Kristi Alexander',
    ].map(
      (name) => addUser({
        name,
        honesty: honesty[Math.floor(Math.random()*honesty.length)],
      })
    );

    const [ userBob, userSue ] = users;

    addContent({ text: 'Apples grow on trees.', isTrue: true }, userBob);
    addContent({ text: 'Apples can be red.', isTrue: true }, userBob);
    addContent({ text: 'Apples can be green.', isTrue: true }, userBob);
    addContent({ text: 'Apples are used to make french fries.', isTrue: false }, userBob);
    addContent({ text: 'Apples are cube-shaped.', isTrue: false }, userSue);

    addClassifier({ text: 'True' }, userBob);
    addClassifier({ text: 'False' }, userBob);

    currentUser = userBob;
  };

  const freeRatify = () => {
    const
      [ classTrue, classFalse ] = getEntitiesByType(ENTITY_TYPE_CLASSIFIER),
      users = getEntitiesByType(ENTITY_TYPE_USER),
      content = getEntitiesByType(ENTITY_TYPE_CONTENT);

    users.forEach((user) => {
      content.forEach((content) => {
        const { honesty } = user;
        const honest = honesty.val > Math.random();
        const [ subjectivelyTrue, subjectivelyFalse ] = honest
          ? [ true, false ]
          : [ false, true ];
        const contentIsTrueToMe = content.isTrue ? subjectivelyTrue : subjectivelyFalse;
        console.log(
          `${user.name} the ${honesty.label}: `+
          `"I ${contentIsTrueToMe?'believe':'doubt'} '${content.text}'"`,
          addRatification(
            content,
            classTrue,
            contentIsTrueToMe,
            user
          )
        );
        addRatification(
          content,
          classFalse,
          !contentIsTrueToMe,
          user
        );
      });
    });
  };

  // Initialize Data
  if (getEntities().length === 0) {
    setup();
  }

  const xyzzy = (
    viewState.spotlightEntity
      ? viewState.spotlightEntity
      : getContent()[0]
  );

  const spotlightEntity = getEntityById(
    xyzzy.id
  );

  console.log(`${getEntities().length} Entities: `, getEntities());

  const accessors = {
    addRatification,
    currentUser,
    getEntityById,
  };

  return (
    <AccessorContext.Provider value={ accessors }>
      <ContentSelector
        placeholder="Select Content"
        entities={ getContent() }
        onChange={ (entity) => setViewState(
          (prevState) => ({
            ...prevState,
            spotlightEntity: entity,
          })
        )}
      />

      <button onClick={ test }>Test</button>
      <button onClick={ freeRatify }>Wait</button>

      <ContentView
        entity={ spotlightEntity }
        accessors={{ addRatification, currentUser }}
      />
    </AccessorContext.Provider>
  );
}

export default App;
