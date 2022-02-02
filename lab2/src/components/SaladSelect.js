import React from 'react';

const createOptions = (data) => {
  return data.map(name => <option key={name} value={name}>{name}</option>);
}

function SaladSelect({data, type, handleChange, valueRef}) {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={type}>
        <h6 style={{textTransform: 'capitalize'}}>{type}:</h6>
      </label>
      <select required id={type} name={type} value={valueRef} className='form-select' onChange={(e) => handleChange(e)}>
        <option value="" disabled >Select a {type}...</option>
        {createOptions(data)}
      </select>
    </div>
  );
}

export default SaladSelect;
