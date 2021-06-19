import Tabs, { TabPane } from 'rc-tabs';
import { PieChart } from 'react-minimal-pie-chart';
import 'rc-tabs/assets/index.css';

function ContentView({ entity, accessors }) {
  const
    { text, classifiers, id: entityId } = entity,
    { addRatification, currentUser } = accessors;

  return (
    <>
      <h1>{ text }</h1>
      <Tabs defaultActiveKey="1" onChange={ () => {} }>
        <TabPane tab="Summary" key="1">
          { entity.classifiersVisible.map(({ text, id }) => <span className="classifier" key={ id }>{ text }</span>) }
        </TabPane>
        { classifiers &&
          <TabPane tab="Classifiers" key="2">
            <Tabs defaultActiveKey="1" onChange={ () => {} }>
              {
                classifiers.map(
                  (classifier) => {
                    const
                      {
                        id,
                        text,
                      } = classifier;

                    return (
                      <TabPane tab={ text } key={ id }>
                        <Tabs defaultActiveKey="1" onChange={ () => {} }>
                          <TabPane tab="Summary" key="1">
                            <PieChart
                              style={{ height: '100px' }}
                              viewBoxSize={[ 100,100 ]}
                              label={({ dataEntry }) => dataEntry.value}
                              data={[
                                {
                                  title: 'For',
                                  value: classifier.getRatificationsByContent(entity).filter(
                                    ({ multiplier }) => multiplier > 0
                                  ).length,
                                  color: '#f00'
                                },
                                {
                                  title: 'Against',
                                  value: classifier.getRatificationsByContent(entity).filter(
                                    ({ multiplier }) => multiplier <= 0
                                  ).length,
                                  color: '#ddd'
                                },
                              ]}
                            />
                            <button onClick={ () => addRatification({ id: entityId }, { id }, true, currentUser) }>Ratify</button>
                          </TabPane>
                        </Tabs>
                      </TabPane>
                    );
                  }
                )
              }
            </Tabs>
          </TabPane>
          }
        </Tabs>
    </>
  );
}

export default ContentView;
