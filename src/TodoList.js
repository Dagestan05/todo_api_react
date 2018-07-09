import React, { Component } from 'react';

import TodoForm from './TodoForm';
import TodoTask from './TodoTask'

const API_URL = 'http://localhost:8080/api/todos/';

class TodoList extends Component{
  constructor(props){
    super(props)
    this.state = {
      todos: []
    }
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
  }
  componentDidMount(){
    this.loadTodos()
  }
  // LOAD TODOS
  loadTodos(){
    fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then(data=>{
            let err = {errorMessage: data.message}
            throw err;
          })
        } else {
          let err={errorMessage: "Problem in server, try again later"}
          throw err;
        }
      }
      return response.json()
    })
    .then(todos =>{
      this.setState({todos})
    })
  }
  //ADDTODO
  addTodo(newTodo){
    fetch(API_URL, {
      method: "POST",
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({name: newTodo})
    })
    .then(response => {
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then(data=>{
            let err = {errorMessage: data.message}
            throw err;
          })
        } else {
          let err={errorMessage: "Problem in server, try again later"}
          throw err;
        }
      }
      return response.json()
    })
    .then(newTodo =>(
      this.setState({todos: [...this.state.todos, newTodo]})
    ))
  }

  // DELETE TODO
  deleteTodo(id){
    const deleteURL = API_URL + id;
    fetch(deleteURL, {
      method: "DELETE"
    })
    .then(response => {
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then(data=>{
            let err = {errorMessage: data.message}
            throw err;
          })
        } else {
          let err={errorMessage: "Problem in server, try again later"}
          throw err;
        }
      }
      return response.json()
    })
    .then(() =>{
      const newTodos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({todos: newTodos})
    })

  }

  toggleTodo(id, completed){
    const updateURL = API_URL + id;
    fetch(updateURL, {
      method: "PUT",
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({completed: !completed})
    })
    .then(response => {
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then(data=>{
            let err = {errorMessage: data.message}
            throw err;
          })
        } else {
          let err={errorMessage: "Problem in server, try again later"}
          throw err;
        }
      }
      return response.json()
    })
    .then((updatedTodo) =>{
      const updatedTodos = this.state.todos.map(todo=>(
        (todo._id === updatedTodo._id) 
        ? {...todo, completed: !completed}
        : todo
      )  
      );
      this.setState({todos: updatedTodos})
    })
  }
  //RENDER
  render(){
    const listItems = this.state.todos.map(item => (
        <TodoTask 
              key={item._id} 
              {...item}
              deleteTodo={this.deleteTodo}
              toggleTodo={this.toggleTodo}
              />      
      )
    )
    return (
      <div className="list">
        <TodoForm addTodo={this.addTodo}/>
        <ul>        
          {listItems}
        </ul>
      </div>
    )
  }
}


export default TodoList;