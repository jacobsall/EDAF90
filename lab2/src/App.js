import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import ComposeSaladWrapper from './components/ComposeSaladWrapper';
import ViewOrder from './components/ViewOrder';
//import inventory from './lib/inventory.ES6';
import ViewIngredient from './components/ViewIngredient';
import Home from './components/Home';

class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      inventory: {},
      order: []
    };
  }

  addSalad = (salad) => {
    this.setState(state => {
      return {order: [...state.order, salad]}
    });
  }

  removeSalad = (salad) => {
    this.setState(state => {
      return {order: state.order.filter(i => i.uuid !== salad.uuid)}
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
            return fetchJson(url + endpoint + ingredient).then(i => inventory[ingredient] = i);
          }))
        })
      })
    ).then(() => this.setState({inventory}))
  }

  render() {
    return (
      <div className="container py-4">
        <Header/>
        <NavBar/>
        
        <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='*' element={<h4>Page not found</h4>}/>
          <Route path='/view-order' element={<ViewOrder order={this.state.order} handleRemove={this.removeSalad}/>}/>
          <Route path='/compose-salad' element={<ComposeSaladWrapper inventory={this.state.inventory} addSalad={this.addSalad}/>}/>
          <Route path='/view-ingredient/:name' element={<ViewIngredient inventory={this.state.inventory}/>}/>
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
      <li className="nav-item">
        <NavLink 
          className={`nav-link`} 
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
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
          to='/view-order'
        >
          Shopping cart
        </NavLink>  
      </li>
    </ul>
  );
}

export default App;
