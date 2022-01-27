import { Component } from 'react';
import SaladCheckbox from './SaladCheckbox';
import SaladSelect from './SaladSelect';

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: props.inventory,
      foundation: '',
      protein: '',
      extras: [],
      dressing: ''
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(target.type === 'checkbox'){
      let list = this.state[name];
      list = target.checked ? list.concat(value) : list.filter(i => i !== value);
      this.setState({
        [name]: list 
      }, () => {
        console.log(this.state)
      });
    }
    else{
      this.setState({
        [name]: value 
      }, () => {
        console.log(this.state)
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    
  }

  render() {
    let extras = Object.keys(this.state.inventory).filter(name => this.state.inventory[name].extra);
    let foundation = Object.keys(this.state.inventory).filter(name => this.state.inventory[name].foundation);
    let protein = Object.keys(this.state.inventory).filter(name => this.state.inventory[name].protein);
    let dressing = Object.keys(this.state.inventory).filter(name => this.state.inventory[name].dressing);

    return (
      <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
          <form onSubmit={(e) => this.handleSubmit(e)}>
              <SaladSelect type='foundation' data={foundation} handleChange={this.handleChange}/>
              <SaladSelect type='protein' data={protein} handleChange={this.handleChange}/>
              <SaladCheckbox type='extras' data={extras} handleChange={this.handleChange}/>
              <SaladSelect type='dressing' data={dressing} handleChange={this.handleChange}/>
              <input className='btn btn-outline-secondary' type='submit' value='Submit'/>
          </form>
      </div>
    </div>
    );
  }

}
export default ComposeSalad;