import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom'
import './todo.css'
import Context from '../ContextApi/context'

class TodoItem extends Component{
        constructor(){
        super();
        this.state = {data : [] , loading : false}
        
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
    showInfor(i){
     return (event) =>{
         console.log(i); //trả về high order function khi showinfor được gọi trong lúc render(vì lúc render truyền vào tham số i đồng nghĩa với trả về giá trị trả về của hàm mặc định sẽ chạy hàm showinfor ngay) thì lệnh bên trong hàm return chỉ chạy khi click
         alert(i.Name)
     }
    }
    render(){
 /*        let className = 'TodoItem';
        if(this.props.item.isComplete === true){
            className += ' TodoItem-complete' 
        } */
        if(this.state.loading === true){
       
        return (
            <div className='TodoItem'>
           <p>{this.state.data.map((i,index)=> <li onClick={this.showInfor(i)} key={index}>{i.Name}</li>)}</p>
           <p>{this.so}</p>
           <button onClick={this.clickMe.bind(this)}>click de xoa state</button>  
           <input type="text" id='text' placeholder='nhap de tim kiem' onKeyUp={this.Search.bind(this)}></input>
           <Link to='/traffic/456'>Traffic</Link> 
           <Context.Consumer>
               {context=>(<div><p>{context.name} {context.number}</p> <button onClick={context.updateNumber}>Hello Context</button></div>)}
           </Context.Consumer>
           </div>
        )                 
     }
     else{
         return(
             <h2>Dang loading</h2>
         )
     }
     
        //  this.clickMe.bind(this) dùng để bind đến class cha đang chứa state không có thì phương this.setSate ở hàn clackMe sẽ trỏ đến object gọi nó là button mà button thì kh có state  
        // <Link to='/traffic/123'>Traffic</Link>  vì đang sử dung :id la params
    }
 
    componentDidMount(){
        fetch('http://localhost:3216/test' , {method : 'POST' , headers :
        {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({id : '5f3cb42bdb4aac2e7c35251e'})
    })
    .then(res=>res.json())
    .then((data) => {this.setState({data : data , loading : true}); })

    }
    
}

export default TodoItem;