import MultiToggle from './MultiToggle';

const arrayStates = [ 'Ratified', 'Protested', 'Neutral' ];

const Classifier = ({ classifier: { text } }) => (
  <MultiToggle
    className="classifier"
    onChange={ ({ item }) => console.log(item) }
    arrayStates={ arrayStates }
  >
    { text }
  </MultiToggle>
);

export default Classifier;
