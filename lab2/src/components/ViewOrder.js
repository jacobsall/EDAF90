import React from 'react';

const createOrderList = (order, handleRemove) => {
  return order.map(salad => {
    let everything = Object.keys(salad.ingredients).map(i => <div key={salad.uuid+i}>{i + " " + salad.ingredients[i].price + "kr"}</div>);
    return (
      <li key={salad.uuid} className='list-group-item'>
        <div className='d-flex w-100 justify-content-between'>
          <h4>{salad.uuid}</h4>
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

function ViewOrder({order, handleRemove}) {
  return (
    <div className='container col-12 mb-3'>
      <div className='row p-5 h-200 bg-light border rounded-3'>
        <h2>Shopping cart</h2>
        <ul className='list-group'>
          {createOrderList(order, handleRemove)}
        </ul> 
      </div>
    </div>
  );
}

export default ViewOrder;
