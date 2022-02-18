import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import ComposeSaladWrapper from './components/ComposeSaladWrapper';
import ViewBasket from './components/ViewBasket';
//import inventory from './lib/inventory.ES6';
import ViewIngredient from './components/ViewIngredient';
import Home from './components/Home';
import ViewOrders from './components/ViewOrders';
import Salad from './lib/Salad';

class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      inventory: {},
      basket: [],
      orders: []
    };
  }

  confirmOrder = (order) => {
    this.setState(state => {
      return {orders: [...state.orders, order], basket: []}
    }, () => {
      localStorage.setItem('orders', JSON.stringify(this.state.orders))
      localStorage.setItem('basket', JSON.stringify(this.state.basket))
  });
  }

  addSalad = (salad) => {
    this.setState(state => {
      return {basket: [...state.basket, salad]}
    }, () => {
      localStorage.setItem('basket',JSON.stringify(this.state.basket));
      //console.log(JSON.parse(localStorage.getItem('basket')))
    });  
  }

  removeSalad = (salad) => {
    this.setState(state => {
      return {basket: state.basket.filter(i => i.uuid !== salad.uuid)}
    }, () => {
      localStorage.setItem('basket', JSON.stringify(this.state.basket));
      //console.log(JSON.parse(localStorage.getItem('basket')))
    });  
  }

  componentDidMount() {
    let url = "http://localhost:8080/";
    let endpoints = ["foundations/", "proteins/", "dressings/", "extras/"];
    const inventory = {};

    Promise.all(
      endpoints.map(endpoint => {
        return fetchJson(url + endpoint).then(ingredients => {
          return Promise.all(ingredients.map(ingredient => {
            return fetchJson(url + endpoint + ingredient).then(info => inventory[ingredient] = info);
          }))
        })
      })
    ).then(() => this.setState({inventory})).catch(error => console.log(error));

    //localStorage.clear()

    if (localStorage.getItem('basket')) {
      let basket = JSON.parse(localStorage.getItem('basket')).map(s => new Salad(JSON.stringify(s)));
      this.setState({basket})
    }
    if (localStorage.getItem('orders')) this.setState({orders: JSON.parse(localStorage.getItem('orders'))})
  }

  render() {
    return (
      <div className="container py-4">
        <Header/>
        <NavBar/>
        
        <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='*' element={<h4>Page not found</h4>}/>
          <Route path='/view-basket' element={<ViewBasket basket={this.state.basket} confirmOrder={this.confirmOrder} handleRemove={this.removeSalad}/>}/>
          <Route path='/compose-salad' element={<ComposeSaladWrapper inventory={this.state.inventory} addSalad={this.addSalad}/>}/>
          <Route path='/view-ingredient/:name' element={<ViewIngredient inventory={this.state.inventory}/>}/>
          <Route path='/view-orders' element={<ViewOrders orders={this.state.orders}/>}/>
        </Routes>
    
        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - webprogramming
        </footer>
      </div>
    );
  }
}

const fetchJson = (url) => {
  return fetch(url).then(response => {
    if(!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  })
}

const Header = () => {
  return (
    <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">My salad bar</span>
    </header>
  );
}

const NavBar = () => {
  return (
    <ul className="nav nav-tabs">
      <li>
        <NavLink 
          className={`nav-link`} 
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          className={`nav-link`} 
          to="/compose-salad"
        >
          Compose a salad
        </NavLink>
      </li>
      <li>
        <NavLink 
          className={`nav-link`}
          to='/view-basket'
        >
          Shopping cart
        </NavLink>  
      </li>
      <li>
        <NavLink 
          className={`nav-link`}
          to='/view-orders'
        >
          Orders
        </NavLink>  
      </li>
    </ul>
  );
}

export default App;
