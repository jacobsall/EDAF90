import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

import ComposeSaladWrapper from './components/ComposeSaladWrapper';
import ViewOrder from './components/ViewOrder';
import inventory from './lib/inventory.ES6';
import ViewIngredient from './components/ViewIngredient';
import Home from './components/Home';

class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div className="container py-4">
        <Header/>
        <NavBar/>
        
        <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='*' element={<h4>Page not found</h4>}/>
          <Route path='/view-order' element={<ViewOrder order={this.state.order} handleRemove={this.removeSalad}/>}/>
          <Route path='/compose-salad' element={<ComposeSaladWrapper inventory={inventory} addSalad={this.addSalad}/>}/>
          <Route path='/view-ingredient/:name' element={<ViewIngredient inventory={inventory}/>}/>
        </Routes>
    
        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - webprogramming
        </footer>
      </div>
    );
  }
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
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link 
          className={`nav-link ${useLocation().pathname === '/' ? "active" : ""}`} 
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          className={`nav-link ${useLocation().pathname === '/compose-salad' ? "active" : ""}`} 
          to="/compose-salad"
        >
          Compose a salad
        </Link>
      </li>
      <li>
        <Link 
          className={`nav-link ${useLocation().pathname === '/view-order' ? "active" : ""}`}
          to='/view-order'
        >
          Shopping cart
        </Link>  
      </li>
    </ul>
  );
}

export default App;
