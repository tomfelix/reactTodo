import React from 'react';
import {ListGroup, ListGroupItem, Button, Checkbox, Row, Col} from 'react-bootstrap';

const List = props => {

  if(props.filtered) {
    let filteredTodos = props.todos.filter((todo) => {
      return todo.isDone === true;
    });
    return (
      <ListGroup className="list-group">
      {filteredTodos.map((todo) => {
        let index = todo.index;
        return (
          <ListGroupItem key={todo.index} className="list-group-item">
            <Row className="show-grid">
              <Col xs={4} md={4}>
                <Checkbox className="check" checked={!!todo.isSelected} onClick={() => props.isSelected(todo)} ></Checkbox>
              </Col>
              <Col xs={4} md={4}>
                <p id={todo.index} onClick={() => props.toggleDone(todo)} >{todo.text}</p>
              </Col>
              <Col xs={4} md={4}>
                <Button onClick={() => props.removeItem(index)} bsStyle="danger">X</Button>
              </Col>
            </Row>
          </ListGroupItem>
        );
        })}
      </ListGroup>
    )
  }

  return (
    <ListGroup className="list-group">
    {props.todos.map((todo) => {
      let index = todo.index;
      return (
        <ListGroupItem key={todo.index} className="list-group-item">
          <Row className="show-grid">
            <Col xs={4} md={4}>
              <Checkbox className="check" checked={!!todo.isSelected} onChange={() => props.isSelected(todo)} ></Checkbox>
            </Col>
            <Col xs={4} md={4}>
              <p id={todo.index} onClick={() => props.toggleDone(todo)} >{todo.text}</p>
            </Col>
            <Col xs={4} md={4}>
              <Button onClick={() => props.removeItem(index)} bsStyle="danger">X</Button>
            </Col>
          </Row>
        </ListGroupItem>
      );
      })}
    </ListGroup>
  )
}

export default List;
