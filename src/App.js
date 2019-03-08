import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

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
      .then(e => this.setState({inputs: e.data.form_structure}))
    )
    .catch(err => console.log(err))
  }
  inputComum(label,componentId,helpBlock,type){
    return <label key={componentId} >
            {label}{" "}
            <input 
            name={componentId}
            ref={componentId}
            type={type} 
            placeholder={label}
            onChange={(e) => this.setState({[componentId]: e.target.value})}
            value={this.state[componentId]}
            />
            {helpBlock}
          </label>
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
  renderInputs(){
    return this.state.inputs.map(({label,componentId,type,helpBlock}) => {
      switch(type){
        case "textfield":
          return this.inputComum(label,componentId,helpBlock,'text',label)
        
        case "datefield":
          return this.inputComum(label,componentId,helpBlock,'date',label)

        case "ratingfield":
          return this.inputRating(label,componentId,helpBlock)

        case "urlfield":
          return this.inputComum(label,componentId,helpBlock,'url',label)
          
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
          <h1>Cadastro pokemon</h1>
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
