import { Component } from 'react';
import SaladCheckbox from './SaladCheckbox';
import SaladSelect from './SaladSelect';
import Salad from '../lib/Salad';

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: '',
      protein: '',
      extras: [],
      dressing: '',
      formErrors : {
        submissionFailed: false,
        extras: false,
      }
    };
  }

  handleChange = (event) => {
    event.target.parentElement.classList.add("was-validated");

    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(target.type === 'checkbox'){
      let list = this.state[name];
      list = target.checked ? list.concat(value) : list.filter(i => i !== value);
  
      let extraError = list.length < 3 || list.length > 9

      this.setState(state => ({
        [name]: list,
        formErrors: {
          ...state.formErrors,
          extras: extraError
        }
      }));
    }
    else{
      this.setState({
        [name]: value 
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.classList.add("was-validated");

    let extraError = this.state.extras.length < 3 || this.state.extras.length > 9;

    if(extraError){
      this.setState({
        formErrors: {
          submissionFailed: true,
          extras: extraError
        }
      })
      return
    }

    if(!e.target.checkValidity()){
      this.setState({
        formErrors: {
          submissionFailed: true,
          extras: extraError
        }
      })
      return
    }

    let salad = new Salad();
    salad.add(this.state.foundation, this.props.inventory[this.state.foundation]);
    salad.add(this.state.protein, this.props.inventory[this.state.protein]);
    salad.add(this.state.dressing, this.props.inventory[this.state.dressing]);
    this.state.extras.forEach(extra => salad.add(extra, this.props.inventory[extra]));
    
    this.props.addSalad(salad);

    this.setState({
      foundation: '',
      protein: '',
      extras: [],
      dressing: ''
    });

    this.props.navigate('/view-basket');
  }

  render() {
    let extras = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].extra);
    let foundation = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].foundation);
    let protein = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].protein);
    let dressing = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].dressing);

    return (
      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Pick the content of your salad</h2>
          <form noValidate onSubmit={(e) => this.handleSubmit(e)}>
              <SaladSelect type='foundation' data={foundation} handleChange={this.handleChange} valueRef={this.state.foundation}/>
              <SaladSelect type='protein' data={protein} handleChange={this.handleChange} valueRef={this.state.protein}/>
              <SaladCheckbox type='extras' data={extras} handleChange={this.handleChange} valueRefs={this.state.extras} showError={this.state.formErrors.submissionFailed && this.state.formErrors.extras}/>
              <SaladSelect type='dressing' data={dressing} handleChange={this.handleChange} valueRef={this.state.dressing}/>              
              <input className='btn btn-outline-dark' type='submit' value='Submit'/>
          </form>
        </div>
      </div>
    );
  }

}
export default ComposeSalad;