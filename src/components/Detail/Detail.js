import React from 'react';
import { useHistory } from 'react-router-dom';

const Detail = (props) => {
  const history = useHistory();
  const { match } = props;

  console.log("MATCH", match.params.id);
  return (
    <div>hi</div>
  );
};

export default Detail;
