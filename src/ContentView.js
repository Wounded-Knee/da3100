import Tabs, { TabPane } from 'rc-tabs';
import { AccessorContext } from './App';
import { PieChart } from 'react-minimal-pie-chart';
import 'rc-tabs/assets/index.css';

function RatificationChart({ ratifications }) {
  const { allFor, allAgainst } = ratifications.reduce(
    (report, ratification) => {
      const forAgainst = ratification.multiplier > 0 ? 'allFor' : 'allAgainst';
      return ({
        ...report,
        [forAgainst]: [
          ...report[forAgainst],
          ratification,
        ]
      });
    }, { allFor: [], allAgainst: [] }
  );

  return (
    <div className="RatificationChart">
      <dl className="key">
        <dt>✅</dt>
        <dd>{ allFor.length }</dd>
        <dt>🚫</dt>
        <dd>{ allAgainst.length }</dd>
      </dl>

      <PieChart
        style={{ height: '200px' }}
        viewBoxSize={[ 100,100 ]}
        label=""
        data={[
          {
            title: 'For',
            value: allFor.length,
            color: '#77b255'
          },
          {
            title: 'Against',
            value: allAgainst.length,
            color: '#dd3349'
          },
        ]}
      />
    </div>
  );
}

function RatificationList({ ratifications, getEntityById }) {
  return (
    <table className="RatificationList">
      <thead>
        <tr>
          <th>⭐</th>
          <th>Who</th>
          <th>When</th>
        </tr>
      </thead>
      <tbody>
        {
          ratifications.map(
            (rat) => {
              return (
                <tr>
                  <td>{ rat.multiplier > 0 ? '✅' : '🚫' }</td>
                  <td>{ getEntityById(rat.userID).name }</td>
                  <td>{ rat.date.toString() }</td>
                </tr>
              );
            }
          )
        }
      </tbody>
    </table>
  );
}

function ContentView({ entity }) {
  const
    { text, classifiers, id: entityId } = entity;

  return (
    <AccessorContext.Consumer>
      {({ addRatification, currentUser, getEntityById }) => (
        <div className="ContentView">
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
                          { id, text } = classifier,
                          ratifications = classifier.getRatificationsByContent(entity);

                        return (
                          <TabPane tab={ text } key={ id }>
                            <Tabs defaultActiveKey="1" onChange={ () => {} }>
                              <TabPane tab="Summary" key="1">
                                <RatificationChart ratifications={ ratifications } />
                                <button onClick={ () => addRatification({ id: entityId }, { id }, true, currentUser) }>Ratify</button>
                              </TabPane>
                              <TabPane tab="Ratifications" key="2">
                                <RatificationChart ratifications={ ratifications } />
                                <RatificationList ratifications={ ratifications } getEntityById={ getEntityById } />
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
        </div>
      )}
    </AccessorContext.Consumer>
  );
}

export default ContentView;
