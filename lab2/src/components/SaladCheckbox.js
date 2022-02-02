import React from 'react';

const createCheckbox = (data, type, handleChange, valueRefs) => {
    return data.map(name => 
      <label className='col-3' key={name} htmlFor={type+name}>
        {name} <input id={type+name} value={name} name={type} type='checkbox' onChange={(e) => handleChange(e)} checked={valueRefs.includes(name)}/>
      </label>
    );
  }

export default function SaladCheckbox({data, type, handleChange, valueRefs}) {
  return (
    <div className='form-group mb-3'>
      <label>
        <h6 style={{textTransform: 'capitalize'}}>{type}:</h6>
      </label>
      <div className='form-control' style={{display: 'block'}}>
        {createCheckbox(data, type, handleChange, valueRefs)}
      </div>
    </div>
  );
}
