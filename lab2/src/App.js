import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import ComposeSalad from './components/ComposeSalad';
import ViewOrder from './components/ViewOrder';
import inventory from './lib/inventory.ES6';

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
      return {order: this.state.order.filter(i => i.uuid !== salad.uuid)}
    });
  }

  render() {
    return (
      <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
      
      <ViewOrder order={this.state.order} handleRemove={this.removeSalad}/>
      <ComposeSalad inventory={inventory} addSalad={this.addSalad}/>
  
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
    );
  }
  
}

export default App;
