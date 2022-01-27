import React from 'react';

const createCheckbox = (data, type, handleChange) => {
    return data.map(x => 
      <label className='col-3' key={x} /* htmlFor={x} */>
        {x} <input value={x} name={type} type='checkbox' onChange={e => handleChange(e)}/>
      </label>
    );
  }

export default function SaladCheckbox({data, type, handleChange}) {
  return (
    <div className='form-group mb-3'>
      <label>
        <h6 style={{textTransform: 'capitalize'}}>{type}:</h6>
      </label>
      <div className='form-control' style={{display: 'block'}}>
        {createCheckbox(data, type, handleChange)}
      </div>
    </div>
  );
}
