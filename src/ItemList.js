import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ItemList.css';

function ItemList({ items, onEditItem, onDeleteItem, onToggleComplete }) {
  return (
    <TransitionGroup component="ul">
      {items.map((item, index) => (
        <CSSTransition key={index} timeout={500} classNames="item">
          <li className={item.completed ? 'completed' : ''}>
            <span onClick={() => onToggleComplete(index)}>
              {item.text} <br />
              <small>Added: {item.addedAt}</small> <br />
              {item.completed && <small>Completed: {item.completedAt}</small>}
            </span>
            <button onClick={() => onEditItem(index)}>Edit</button>
            <button onClick={() => onDeleteItem(index)}>Delete</button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default ItemList;