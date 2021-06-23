import MultiToggle from './MultiToggle';

const arrayStates = [ 'Ratified', 'Protested', 'Neutral' ];

const Classifier = ({ classifier: { text } }) => (
  <MultiToggle
    className="classifier"
    onChange={ ({ state }) => console.log(state) }
    arrayStates={ arrayStates }
  >
    { text }
  </MultiToggle>
);

export default Classifier;
