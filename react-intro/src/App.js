import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoItem from "./TodoItem";

class App extends Component {
  state = {
    inputValue: "", 
    todos: [],
    dones: []
  };

  handleSubmit = e => {
    e.preventDefault();

    // push new item to "todos"
    const newTodoItem = this.state.inputValue;
    this.setState({
      todos: [...this.state.todos, newTodoItem],
      inputValue: ""
    });
    //clear value input
  };

  handleInputChange = e => {
    // console.log(e.target.value); // tro vao input co onchange
    this.setState({
      inputValue: e.target.value
    }); // save value input
  };

  handleDeleteItem = item => {
    this.setState({
      todos: this.state.todos.filter(todoitem => {
        if (todoitem === item) {
          return false;
        } else {
          return true;
        }
      })
    });
  };

  handleFinish = (item) => {
    this.setState({
      dones: [...this.state.dones, item],
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add item"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <div className="todo-list">
          {this.state.todos.map((item, index) => {
            return (
              <TodoItem
                key={index}
                item={item}
                index={index}
                handleDelete={this.handleDeleteItem}
                handleFinish={this.handleFinish} 
                isFinish={this.state.dones.indexOf(item) > -1}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
