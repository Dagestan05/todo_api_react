import React, { Component } from 'react';

class TodoForm extends Component{
  constructor(props){
    super(props)
    this.state={
      input: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(e){
    e.preventDefault()
    this.props.addTodo(this.state.input)
    this.setState({input: ''})
  }
  render(){
    return (
      <form className="form" onSubmit={this.onFormSubmit}>
        <input 
          type="text" 
          id="todoInput"
          placeholder="Add a todo here and press Enter..."
          value={this.state.input}
          onChange={(e)=> this.setState({input: e.target.value})}
        />
        
      </form>
    )
  }
}


export default TodoForm;