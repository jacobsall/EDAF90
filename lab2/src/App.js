import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './lib/inventory.ES6';
import ComposeSalad from './components/ComposeSalad';
import Salad from './lib/Salad';
import { Component } from 'react';

class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      inventory: {},
      order: []
    };
  }

  render() {
    return (
      <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
  
      <ComposeSalad inventory={inventory} />
  
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
    );
  }
  
}

export default App;
