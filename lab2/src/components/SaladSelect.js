import React from 'react';

const createOptions = (data) => {
  return data.map(x => <option key={x} value={x}>{x}</option>);
}

function SaladSelect({data, type, handleChange}) {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={type}>
        <h6 style={{textTransform: 'capitalize'}}>{type}:</h6>
      </label>
      <select name={type} className='form-select' onChange={(e) => handleChange(e)}>
        {createOptions(data)}
      </select>
    </div>
  );
}

export default SaladSelect;
