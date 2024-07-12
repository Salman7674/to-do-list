import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import './App.css';

const getInitialItems = () => {
  const savedItems = localStorage.getItem('items');
  return savedItems ? JSON.parse(savedItems) : [];
};

function App() {
  const [items, setItems] = useState(getInitialItems());
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const timestamp = new Date().toLocaleString();
      if (editIndex === -1) {
        setItems([...items, { text: newItem, completed: false, addedAt: timestamp, completedAt: null }]);
      } else {
        const updatedItems = [...items];
        updatedItems[editIndex].text = newItem;
        updatedItems[editIndex].addedAt = timestamp;
        setItems(updatedItems);
        setEditIndex(-1);
      }
      setNewItem('');
    }
  };

  const handleEditItem = (index) => {
    setNewItem(items[index].text);
    setEditIndex(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleToggleComplete = (index) => {
    const updatedItems = [...items];
    const timestamp = new Date().toLocaleString();
    updatedItems[index].completed = !updatedItems[index].completed;
    updatedItems[index].completedAt = updatedItems[index].completed ? timestamp : null;
    setItems(updatedItems);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredItems = items.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !item.completed;
    if (filter === 'Completed') return item.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Enhanced Item List</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add or edit an item"
      />
      <button onClick={handleAddItem}>
        {editIndex === -1 ? 'Add Item' : 'Update Item'}
      </button>
      <div>
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Active')}>Active</button>
        <button onClick={() => handleFilterChange('Completed')}>Completed</button>
      </div>
      <ItemList
        items={filteredItems}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;