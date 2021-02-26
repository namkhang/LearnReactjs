import React , {Component} from 'react';
import {Switch , Route} from 'react-router-dom';
import TodoItem from './component/firsrt-component';
import Traffic from './component/Traffic'
import Login from './component/login'
import './App.css'


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
          <Route  path='/traffic/:id' render={props=><Traffic {...props} time={1000} />}></Route>
          <Route path='/login' exact render={props=><Login {...props} ></Login>}></Route>
        </Switch>
  
      </div>
    );
  }
}

export default App;