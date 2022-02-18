import React from 'react'

const createOrder = (orders) => {
  return orders.map(order => {
    return (
      <li key={order.uuid} className='list-group-item'>
        <div className='d-flex w-100 justify-content-between'>
          <h4>Order</h4>
          <small>{order["uuid"]}</small>
        </div>
        <hr className='mt-0'></hr>
        <div className='d-flex justify-content-between'>
          <small>
            <div style={{textTransform: 'capitalize'}}>
              Status: {order.status}
            </div>
            <div>
              Id: {order.uuid}
            </div>
            <div>
              Nbr of salads: {order.order.length}
            </div>
            <div>
              Price: {order.price} kr
            </div>
          </small>
        </div>
      </li>
    )
  })
}

function ViewOrders({orders}) {
  return (
    <div className='container col-12 mb-3'>
      <div className='row p-5 h-200 bg-light border rounded-3'>
        <h2>Order confirmations</h2>
        <ul>{createOrder(orders)}</ul>
      </div>
    </div>
  )
}

export default ViewOrders