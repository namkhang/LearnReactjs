import React  from 'react';
import {Switch , Route} from 'react-router-dom';
import TodoItem from './component/firsrt-component';
import Traffic from './component/Traffic'
import Login from './component/login'
import './App.css'
import TestReactHook from './component/reacthooks'
import Provider from '../src/ContextApi/provider'


function App(){


/*       this.todoItem = [
        {title : 'Khang' , isComplete : true},
        {title : 'Phong' , isComplete : false},
        {title : 'Phuc' , isComplete : false},
        {title : 'Hoang' , isComplete : true},
      ] */


    return(
      <div className="App">
        <Provider>
        <Switch>
          <Route path='/' exact component={TodoItem}></Route>
          <Route  path='/traffic/:id' render={props=><Traffic {...props} time={2000} />}></Route>
          <Route path='/login' exact render={props=><Login {...props} ></Login>}></Route>
          <Route path='/reacthook' exact component={()=><TestReactHook title='hello'></TestReactHook>}></Route>
        </Switch>
        </Provider>
      </div>
    );
  }


export default App;