import React, { useState } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import MainScreenView from './MainScreenView';
import SystemView from './SystemView';
import getEntityObject from './classes/getEntityObject';
import {
  ENTITY_TYPE_USER,
  ENTITY_TYPE_CONTENT,
  ENTITY_TYPE_CLASSIFIER,
  ENTITY_TYPE_RATIFICATION,
} from './constants';
import './App.css';
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

    const clientDate = (new Date()).toString();
    const newRecord = {
      ...newData,
      clientDate,
      date: clientDate,
      id: newID,
    };

    // Groom the entity cache by removing entities redundant with state.
    entityCache = [
      ...entityCache.filter((entityCached) => !entities.find((entityProper) => entityProper.id === entityCached.id)),
      newRecord,
    ];
    // Add the new record to the state.
    setEntities((prevState) => [...prevState, newRecord ]);

    return newRecord;
  };

  const getBlockchainData = () => [ ...entities, ...entityCache ];

  const getEntities = () => getBlockchainData().map(
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
      { val: 1, label: 'infallible' },
      { val: 0.9, label: 'honest' },
      { val: 0.8, label: 'faithful' },
      { val: 0.7, label: 'intuitive' },
      { val: 0.5, label: 'fair' },
      { val: 0.4, label: 'fool' },
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

    addClassifier({ text: 'True' }, userBob);
    addClassifier({ text: 'Topic: Apples' }, userBob);

    addContent({ text: 'Apples grow on trees.', isTrue: true, topicApples: true }, userBob);
    addContent({ text: 'Apples are cube-shaped.', isTrue: false, topicApples: true }, userSue);
    addContent({ text: 'Apples can be red.', isTrue: true, topicApples: true }, userBob);
    addContent({ text: 'Apples can be green.', isTrue: true, topicApples: true }, userBob);
    addContent({ text: 'Apples are used to make french fries.', isTrue: false, topicApples: true }, userBob);
//    addClassifier({ text: 'False' }, userBob);

    currentUser = userBob;
  };

  const freeRatify = () => {
    const
      classifiers = [
        {
          classifier: getEntitiesByType(ENTITY_TYPE_CLASSIFIER)[0],
          hintFlag: 'isTrue',
          consoleCallback: (content, bool) => `"I ${bool?'believe':'doubt'} '${content.text}'"`,
        },
        {
          classifier: getEntitiesByType(ENTITY_TYPE_CLASSIFIER)[1],
          hintFlag: 'topicApples',
          consoleCallback: (content, bool) => `"'${content.text}' ${bool?'seems to be':'isn\'t'} about apples."`,
        },
      ],
      users = getEntitiesByType(ENTITY_TYPE_USER),
      content = getEntitiesByType(ENTITY_TYPE_CONTENT);

    users.forEach((user) => {
      content.forEach((content) => {
        classifiers.forEach(({ consoleCallback, hintFlag, classifier }) => {
          if (Math.random() > 0.9) {
            const { honesty } = user;
            const getBool = (bool) => !!(honesty.val > Math.random());

            /*
            console.log(
              `${user.name} the ${honesty.label}: ` + consoleCallback(content, getBool(content[hintFlag])),
              addRatification(
                content,
                classifier,
                getBool(content.isTrue),
                user
              )
            );
            */
            addRatification(
              content,
              classifier,
              getBool(content.isTrue),
              user
            )
          }
        })
      });
    });
  };

  //setInterval(freeRatify, 10000);

  // Initialize Data
  if (getEntities().length === 0) {
    setup();
  }

  const setViewStateByUser = ({ id }, callback) => {
    setViewState((prevState) => ({
      ...prevState,
      [id]: {
        ...callback(prevState[id]),
      },
    }));
  };

  const getViewStateByUser = ({ id }) => viewState[id] || {};

  //console.log(`${getEntities().length} Entities: `, getEntities());

  const accessors = {
    addRatification,
    currentUser,
    getEntityById,
    getContent,
    setViewStateByUser,
    getViewStateByUser,
    test,
    freeRatify,
    getBlockchainData,
  };
  console.log('Accessors ', accessors);

  return (
    <AccessorContext.Provider value={ accessors }>
      <Tabs defaultActiveKey="1">
        <TabPane tab="System" key="1">
          <SystemView />
        </TabPane>
        {
          getEntitiesByType(ENTITY_TYPE_USER).map(
            (user, index) => <TabPane tab={ user.name } key={ index + 2 }>
              <MainScreenView user={ user } />
            </TabPane>
          )
        }
      </Tabs>
    </AccessorContext.Provider>
  );
}

export default App;
