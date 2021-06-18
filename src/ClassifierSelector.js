import EntitySelector from './EntitySelector';

function ClassifierSelector(props) {
  return <EntitySelector
    selectProps={{
      isMulti: true,
    }}
    { ...props }
  />;
}

export default ClassifierSelector;
