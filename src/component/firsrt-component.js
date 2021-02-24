import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import './todo.css'

class TodoItem extends Component{
        constructor(props){
        super(props);
        this.state = {data : []}
        fetch('http://localhost:3216/test' , {method : 'POST' , headers :
        {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({id : '5f3cb42bdb4aac2e7c35251e'})
    })
    .then(res=>res.json())
    .then((data) => {this.setState({data : data});})
    }
     clickMe(){
         
        this.setState({data: []})
    }
    Search(){
            fetch('http://localhost:3216/searchforreactjs' , {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({name : document.getElementById('text').value})
            })
            .then(res => res.json())
            .then((data) =>{
                    this.setState({data : data})
            })
            .catch(err => console.log(err))
            
    }
    render(){
 /*        let className = 'TodoItem';
        if(this.props.item.isComplete === true){
            className += ' TodoItem-complete' 
        } */
        return (
            <div className='TodoItem'>
           <p>{this.state.data.map(i=> <li>{i.Name}</li>)}</p>
           <button onClick={this.clickMe.bind(this)}>click de xoa state</button>  
           <input type="text" id='text' onKeyUp={this.Search.bind(this)}></input>
    
           <Link to='/traffic/123'>Traffic</Link> 
           </div>
        )    
        //  this.clickMe.bind(this) dùng để bind đến class cha đang chứa state không có thì phương this.setSate ở hàn clackMe sẽ trỏ đến object gọi nó là button mà button thì kh có state  
        // <Link to='/traffic/123'>Traffic</Link>  vì đang sử dung :id la params
    }
}
export default TodoItem;