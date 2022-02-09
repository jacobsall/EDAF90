import React from 'react';
import {Link} from 'react-router-dom'

const createOptions = (data) => {
  return data.map(name => <option key={name} value={name}>{name}</option>);
}

function SaladSelect({data, type, handleChange, valueRef}) {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={type}>
        <h6 style={{textTransform: 'capitalize'}}>{type}:</h6>
      </label>
      <div className='row'>
        <select 
          required
          className='form-select w-auto'
          id={type} 
          name={type} 
          value={valueRef} 
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled>Select a {type}...</option>
          {createOptions(data)}
        </select>
        <div className='invalid-feedback'>
          Please pick a {type}
        </div>
        {valueRef !== '' && 
          <Link className="col-2 bg-blue" to={'/view-ingredient/' + valueRef}>
            <button className='btn btn-light btn-outline-secondary'>
              View info
            </button>
          </Link>
        }
      </div>
    </div>
  );
}

export default SaladSelect;
