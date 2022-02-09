import React from 'react';
import { Link } from 'react-router-dom';

const createCheckbox = (data, type, handleChange, valueRefs) => {
  return data.map(name => 
    <label className='col-3' key={name} htmlFor={type+name}>
      <Link to={'/view-ingredient/' + name}>{name}</Link> <input id={type+name} value={name} name={type} type='checkbox' onChange={(e) => handleChange(e)} checked={valueRefs.includes(name)}/>
    </label>
  );
}

export default function SaladCheckbox({data, type, handleChange, valueRefs, showError}) {
  return (
    <div className='form-group mb-3'>
      <label>
        <h6 style={{textTransform: 'capitalize'}}>{type}:</h6>
      </label>
      <div className='form-control' style={{display: 'block'}}>
        {createCheckbox(data, type, handleChange, valueRefs)}
      </div>
      {showError && <div className="alert alert-warning" role="alert">
        Pick between 3-9 extras.
      </div>}
    </div>
  );
}
