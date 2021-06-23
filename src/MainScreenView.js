import Tabs, { TabPane } from 'rc-tabs';
import ContentView from './ContentView';
import ContentSelector from './ContentSelector';
import { AccessorContext } from './App';

function MainScreenView({ user }) {
  return (
    <AccessorContext.Consumer>
      {({
        getContent,
        setViewStateByUser,
        getViewStateByUser,
        test,
        freeRatify,
        spotlightEntity,
        getBlockchainData,
      }) => (
        <Tabs defaultActiveKey="1">

          <TabPane tab="Main" key="1">
            <ContentSelector
              placeholder="Select Content"
              entities={ getContent() }
              onChange={ (entity) => setViewStateByUser(
                user,
                (prevState) => ({
                  ...prevState,
                  spotlightEntity: entity,
                })
              )}
            />

            <button onClick={ test }>Test</button>
            <button onClick={ freeRatify }>Wait</button>

            <ContentView entity={ getViewStateByUser(user).spotlightEntity || getContent()[0] } />
          </TabPane>

          <TabPane tab="Content" key="2">
            Content, with its classifiers grouped by the ratification you chose.
            <ul>
              <li>Content 1
                <ul>
                  <li>For
                    <ul>
                      <li>Classifier 1</li>
                      <li>Classifier 2</li>
                      <li>Classifier 3</li>
                    </ul>
                  </li>
                  <li>Against
                    <ul>
                      <li>Classifier 4</li>
                    </ul>
                  </li>
                  <li>No Position
                    <ul>
                      <li>Classifier 5</li>
                      <li>Classifier 6</li>
                      <li>Classifier 7</li>
                      <li>Classifier 8</li>
                      <li>Classifier 9</li>
                      <li>Classifier 10</li>
                      <li>Classifier 11</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </TabPane>

          <TabPane tab="Classifiers" key="3">
            Classifiers, and all the content you have ratified them for.
            <ul>
              <li>Classifier 1
                <ul>
                  <li>For
                    <ul>
                      <li>Content 1</li>
                      <li>Content 2</li>
                      <li>Content 3</li>
                    </ul>
                  </li>
                  <li>Against
                    <ul>
                      <li>Content 4</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </TabPane>

          <TabPane tab="Selectors" key="4">
            <ul>
              <li>User Selectors
                <ul>
                  <li>People who Like Hitler
                    <ul>
                      <li>"I like hitler": [ Agreed ] = true</li>
                      <li>"Hitler is cool": [ Agreed ] = true</li>
                      <li>"Hitler is evil": [ Agreed ] = false</li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li>Content Selectors
                <ul>
                  <li>Apple-Related
                    <ul>
                      <li>[ Topic: Apples ] = true</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </TabPane>

        </Tabs>
      )}
    </AccessorContext.Consumer>
  );
};

export default MainScreenView;
