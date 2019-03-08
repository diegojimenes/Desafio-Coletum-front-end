import React, { Component,Fragment } from 'react';
import StarRatings from 'react-star-ratings';
import { Form } from 'react-bootstrap'
import DatePicker from 'react-date-picker';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputs : [],
    }    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    fetch(`https://coletum.com/api/graphql?query={form_structure(formId:6950){label,componentId,type,helpBlock,order,components}}&token=7s5txcu909kwc48wookgw8g00occokk`)
    .then(res => res.json()
      .then(({data}) => this.setState({inputs: data.form_structure}))
    )
    .catch(err => console.log(err))
  }
  inputComum(label,componentId,helpBlock,type){
    return <Form.Group key={componentId}>
      <Form.Label>{label}{" "}</Form.Label>
      <Form.Control 
      type={type}  
      placeholder={label}
      name={componentId}
      ref={componentId} />
      <Form.Text>{helpBlock}</Form.Text>
  </Form.Group>
  }
  inputRating(label,componentId,helpBlock){
    return <label key={componentId}>
            {label}{" "}
            <StarRatings
              rating={this.state[componentId]}
              starDimension="30px"
              starSpacing="10px"
              starRatedColor="blue"
              changeRating={(s) => this.setState({[componentId]: s})}
              numberOfStars={5}
              name='rating'
            />
            <input 
            type='number' 
            ref={componentId}
            value={this.state[componentId]} 
            name={componentId}
            style={{display:'none'}}
            />
            {helpBlock}
          </label>
  }
  inputDate(label,componentId,helpBlock){
    return <Fragment key={componentId}>
      <Form.Group>
        <Form.Label>{label}{" "}</Form.Label>
          <DatePicker
            onChange={(s) => this.setState({[componentId]: s})}
            value={this.state[componentId]} 
          />
          <Form.Text>{helpBlock}</Form.Text>
      </Form.Group>
      <input 
      type='text' 
      ref={componentId}
      value={this.state[componentId]} 
      name={componentId}
      style={{display:'none'}}
      />
    </Fragment>
  }
  renderInputs(){
    return this.state.inputs.map(({label,componentId,type,helpBlock}) => {
      switch(type){
        case "textfield":
          return this.inputComum(label,componentId,helpBlock,'text')
        
        case "datefield":
          return this.inputDate(label,componentId,helpBlock,)

        case "ratingfield":
          return this.inputRating(label,componentId,helpBlock)

        case "urlfield":
          return this.inputComum(label,componentId,helpBlock,'url')
          
        default:
          console.log("Input não encontrado");
      }
  })
  }
  handleSubmit(event) {
    event.preventDefault()
    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    console.log('-->', formData);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cadastro de Pokémon</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputs()}
          <input type='submit' value="ok"/>
        </form>
      </div>
    );
  }
}

export default App;
