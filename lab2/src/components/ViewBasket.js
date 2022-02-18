import React from 'react';
import { useNavigate } from 'react-router-dom';

const createBasketList = (basket, handleRemove) => {
  return basket.map(salad => {
    let everything = Object.keys(salad.ingredients).map(i => <div key={salad.uuid+i}>{i + " " + salad.ingredients[i].price + "kr"}</div>);
    return (
      <li key={salad.uuid} className='list-group-item'>
        <div className='d-flex w-100 justify-content-between'>
          <h4>Custom salad</h4>
          <small>{salad.uuid}</small>
          <h4>
          <span className="badge bg-primary rounded-pill">
            {salad.getPrice() + "kr"}
          </span> 
          </h4>
        </div>
        <hr className='mt-0'></hr>
        <div className='d-flex justify-content-between'>
          <small>
            {everything}
          </small>
          <div className='d-flex '>
            <button className='btn btn-outline-primary mt-auto' onClick={() => handleRemove(salad)}>
              Remove
            </button>
          </div>
        </div>
      </li>
    );
  });
}

const placeOrder = (basket, confirmOrder, navigate) => {
  let salads = basket.map(x => Object.keys(x.ingredients));
  
  fetch("http://localhost:8080/orders/", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(salads)
  }).then(res => res.json()).then(data => confirmOrder(data)).catch(error => console.error(error));
  
  navigate('/view-orders')
}

function ViewBasket({basket, confirmOrder, handleRemove}) {
  const navigate = useNavigate();

  return (
    <div className='container col-12 mb-3'>
      <div className='row p-5 h-200 bg-light border rounded-3'>
        <h2>Shopping cart</h2>
        <ul className='list-group'>
          {createBasketList(basket, handleRemove)}
        </ul> 
        {basket.length !== 0 && 
          <button className='btn btn-outline-secondary' onClick={() => placeOrder(basket, confirmOrder, navigate)}>Place order</button>
        }
      </div>
    </div>
  );
}

export default ViewBasket;
