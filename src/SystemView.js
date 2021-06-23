import Tabs, { TabPane } from 'rc-tabs';
import BlockchainView from './BlockchainView';
import ContentView from './ContentView';
import ContentSelector from './ContentSelector';
import { AccessorContext } from './App';

function MainScreenView() {
  return (
    <AccessorContext.Consumer>
      {({
        getContent,
        setViewState,
        test,
        freeRatify,
        spotlightEntity,
        getBlockchainData,
      }) => (
        <Tabs defaultActiveKey="2">
          <TabPane tab="Content" key="2">
            { /*
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

            <ContentView entity={ spotlightEntity } />
              */}
              Content
          </TabPane>
          <TabPane tab="Classifiers" key="3">

          </TabPane>
          <TabPane tab="Ratifications" key="4">

          </TabPane>
          <TabPane tab="Blockchain" key="5">
            <BlockchainView data={ getBlockchainData() } />
          </TabPane>
        </Tabs>
      )}
    </AccessorContext.Consumer>
  );
};

export default MainScreenView;
