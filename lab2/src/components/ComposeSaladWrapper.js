import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComposeSalad from './ComposeSalad';

const ComposeSaladWrapper = (props) => {
  const navigate = useNavigate();

  return <ComposeSalad navigate={navigate} {...props}/>
}

export default ComposeSaladWrapper;
