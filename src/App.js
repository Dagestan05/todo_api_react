import React, { Component } from 'react';

import Header from './Header';

import TodoList from './TodoList';



class App extends Component {

  //Render
  render() {
    return (
      <div className="App">
        <Header/>
        <TodoList />
      </div>
    );
  }
}

export default App;
