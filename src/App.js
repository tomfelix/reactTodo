import React, { Component } from 'react';
import './App.css';
import List from './List';
import {FormControl, Button, FormGroup, InputGroup, ButtonToolbar, ButtonGroup} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      todos: [],
      filtered: false,
      allSelected: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFiltered = this.handleFiltered.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.removeSelected = this.removeSelected.bind(this);
    this.selectAll = this.selectAll.bind(this);

  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      term: e.target.value
    });
  }

  handleClick() {
    let todo = {
      text: this.state.term,
      isDone: false,
      index: Date.now(),
      isSelected: false
    }
    this.setState({
      todos: [...this.state.todos, todo],
      term: ''
    });
  }


  handleRemoveItem = index => {
    let pos = this.state.todos.map(function(todo) { return todo.index; }).indexOf(index);
    let slicedTodos = this.state.todos.slice(0, pos).concat(this.state.todos.slice(pos + 1));
    this.setState({
      todos: slicedTodos
    });
  }

  handleToggleDone = todo => {
    let toggledTodo = document.getElementById(todo.index);

    if(todo.isDone == false) {
      toggledTodo.className = 'isDone';
      return todo.isDone = true;
    }   toggledTodo.classList.remove('isDone');
    return todo.isDone = false;
  }


  handleFiltered() {
    this.setState(prevState => ({
      filtered: !this.state.filtered
    }));
  }

  handleSelected(todo) {
    todo.isSelected = !todo.isSelected;
  }

  removeSelected() {
    let unSelected = this.state.todos.filter(todo => {
      return todo.isSelected == false;
    });
    this.setState({
      todos: unSelected,
      allSelected: false
    });
  }


  selectAll() {
    if(!this.state.allSelected) {
      this.state.todos.map((todo) => {
        return todo.isSelected = true;
      });
      this.setState({
        allSelected: true
      });
    } else {
      this.state.todos.map((todo) => {
        return todo.isSelected = false;
      });
      this.setState({
        allSelected: false
      });
    }
    console.log(this.state.allSelected);
  }

  render() {

    return (
      <div className="container text-center">
        <FormGroup>
          <InputGroup>
            <FormControl onKeyDown={(key) => {(key.keyCode == 13)? this.handleClick() : null}} value={this.state.term} type="text" className="form-control" placeholder="Add your todo..." onChange={this.handleInputChange} />
            <InputGroup.Button>
              <Button id="addTodo" type="button" onClick={this.handleClick} className="success">Add todo</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <ButtonToolbar>
          <ButtonGroup bsSize="small" justified>
            <Button href='#' onClick={this.handleFiltered} >{(this.state.filtered) ? 'Show all' : 'Show done'}</Button>
            <Button href='#' onClick={this.removeSelected} >Remove selected Todos</Button>
            <Button href='#' onClick={this.selectAll} >{(this.state.allSelected) ? 'Unselect All' : 'Select All'}</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <List removeItem={this.handleRemoveItem} todos={this.state.todos} toggleDone={this.handleToggleDone} filtered={this.state.filtered} isSelected={this.handleSelected} />
      </div>
    );
  }
}


export default App;
