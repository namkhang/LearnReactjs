import React , {Component} from 'react';
import {Switch , Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TodoItem from './component/firsrt-component';
import Traffic from './component/Traffic'

class App extends Component {
    constructor(){
      super();
/*       this.todoItem = [
        {title : 'Khang' , isComplete : true},
        {title : 'Phong' , isComplete : false},
        {title : 'Phuc' , isComplete : false},
        {title : 'Hoang' , isComplete : true},
      ] */
    }
  render(){
    return(
      <div className="App">
   
        <Switch>
          <Route path='/' exact component={TodoItem}></Route>
          <Route  path='/traffic/:id' render={props=><Traffic {...props} time={10000} />}></Route>
        </Switch>

     
  
      </div>
    );
  }
}

export default App;