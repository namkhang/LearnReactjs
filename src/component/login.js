import React , {Component} from 'react';
import Cookies from 'js-cookie';
import '../App.css'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={login : 'fail' , fullname : 'chua login'}
    }
        Login(){
            let dataLogin = { username : document.getElementById('username').value , password : document.getElementById('password').value}
            fetch('http://localhost:3216/loginforreact' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(dataLogin)
                
            })
            .then(res=>res.json())
            .then((data) =>{
                if(data.message){
                    alert(data.message)
                }
                else{
                    this.setState({login : 'success' , fullname : data.fullname})
                    Cookies.set('idlogin' , data._id,{expires : (1/24)/60 , signed : true});
                }
            })
        }
        Logout(){
            Cookies.remove('idlogin')
        }

    render(){
        return(
                <div className='App'>
                        <input type='text' id='username' placeholder='nhap username'></input>
                        <input type='password' id='password' placeholder='nhap password'></input>
                        <button onClick={this.Login.bind(this)}>Login</button>
                        <button onClick={this.Logout.bind(this)}>Logout</button>
                        <h2>{this.state.login}</h2>
                        <h2>{this.state.fullname}</h2>
                </div>
        )
    }
}
export default Login