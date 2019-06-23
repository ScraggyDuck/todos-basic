import React,  {Component} from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.svg';

const storageKey = 'todoList';

class App extends Component {
  constructor(){
    super();
    this.state = {
      newItem: '',
      todoItems: this.getTodoItems()
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClick(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {...item, isComplete: !isComplete},
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }

  getTodoItems(){
    let todoItems = [];
    if(localStorage.getItem(storageKey))
      todoItems = JSON.parse(localStorage.getItem(storageKey));
    return todoItems;
  }

  onDeleteItemClick(item) {
    return (event) => {
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);
      const todoItemsUpdate = [
        ...todoItems.slice(0, index),
        ...todoItems.slice(index + 1)
      ];

      localStorage.setItem(storageKey, JSON.stringify(todoItemsUpdate));

      this.setState({
        todoItems: todoItemsUpdate
      });
    };
  }

  onKeyUp(event){
    if(event.keyCode === 13){
      let text = event.target.value;

      if(!text)
        return;

      text = text.trim();
      if(!text)
        return;

      let {todoItems} = this.state;
      let todoItemsUpdate = [{ title: text, isComplete: false }, ...todoItems,];
      localStorage.setItem(storageKey, JSON.stringify(todoItemsUpdate));

      this.setState({
        newItem: '',
        todoItems: todoItemsUpdate
      });
    }
  }

  onChange(event){
    this.setState({
      newItem: event.target.value
    });
  }

  render(){
    const {newItem, todoItems} = this.state;
    return (
      <div className="container">
        <p>todos</p>
        <div className="App">
          <div className="header">
            <img src={tick} width={15} height={15}/>
            <input
              type="text" 
              value={newItem} 
              onChange={this.onChange}
              onKeyUp={this.onKeyUp} 
              placeholder="What needs to be done?" 
            />
          </div>
          {
            todoItems.length > 0 && todoItems.map((item, index) => 
              <TodoItem item={item} key={index} 
                onItemClick={this.onItemClick(item)} 
                onDeleteItemClick={this.onDeleteItemClick(item)}
              />)
          }
        </div>
      </div>
    );
  }
}

export default App;
