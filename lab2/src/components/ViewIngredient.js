import React from 'react';
import { useParams } from 'react-router-dom';

function ViewIngredient(props) {
  let params = useParams();
  const ingredient = props.inventory[params.name];

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h1>{params.name}</h1>
        {Object.keys(ingredient).map(prop => 
          <div key={prop}> {prop + " : " + ingredient[prop]} </div>
        )}
      </div>
    </div>
  );
}

export default ViewIngredient;
