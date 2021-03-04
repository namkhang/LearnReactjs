import React , {Component} from 'react';
import Context from '../ContextApi/context'
import Cookies from 'js-cookie';
import FacebookLogin  from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login';
import '../App.css'
import io from 'socket.io-client'
let socket = io('http://localhost:5000');






class Login extends Component{
    constructor(props){
        super(props)
        this.state={login : 'fail' , fullname : 'chua login' , listOnline : [] }
        
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
                    Cookies.set('idlogin' , data._id,{expires : (1/24)/60 });
                    window.location.href = '/traffic/456'
                }
            })
        }
        Logout(){
            Cookies.remove('idlogin')
        }
        Enter(event){
            if(event.keyCode === 13){
                    let data = {username : document.getElementById('username').value , password : document.getElementById('password').value};
                    fetch('http://localhost:3216/loginforreact' , {
                        method : 'POST' , 
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(data)
                    })
                    .then(res=>res.json())
                    .then((data)=>{
                        console.log(data);
                        if(data.message){
                            alert(data.message)
                        }
                        else{
                            Cookies.set('idlogin' , data._id, {expires : (1/24)/60});
                            window.location.href = '/traffic/123';
                        }
                    })
            }
        }
            Socket(event){
                if(event.keyCode === 13)
                {
                        socket.emit('hello' , {name :document.getElementById('name').value , id : socket.id});
                    
                     
                }
            }
            Target(event){
                socket.emit('target' , event.target.innerHTML)
            }

            responseFacebook(res){
                console.log(res);
            }
            responseGoogle(res){
                console.log(res);
            }

        componentDidMount(){
        socket.on('error', function()
        {
            console.log("Sorry, there seems to be an issue with the connection!");
        });
        
        socket.on('connect_error', function(err)
        {
            console.log("connect failed"+err);
           
        });
        
        socket.on("connect", () => {
            console.log(socket.connected); 
            console.log(socket.id); 
          });
          socket.on('server-hello' , (data)=>{
            this.setState({listOnline : data})
         })
         socket.on('server-target' , (data)=>{
            alert(data)
         })
            }
        

    render(){
        
        return(
                <div className='App'>
                        <input type='text' id='username' placeholder='nhap username'></input>
                        <input type='password' onKeyUp={this.Enter.bind(this)} id='password' placeholder='nhap password'></input>
                        <button onClick={this.Login.bind(this)}>Login</button>
                        <button onClick={this.Logout.bind(this)}>Logout</button>
                        <input type='text' onKeyUp={this.Socket.bind(this)} id='name' placeholder='nhap ten cua ban'></input>
                        <h2>{this.state.login}</h2>
                        <h2>{this.state.fullname}</h2>
                        <Context.Consumer>
                            {(context)=><h2>{context.name}</h2>}
                        </Context.Consumer>
                     {this.state.listOnline.map((i,index) => <h2 onClick={this.Target.bind(this)} key={index}>{i.id}</h2>) }
                     <FacebookLogin
                        appId="338920947504839"
                        autoLoad={false} // nếu là true thì sẽ chạy ngay khi vừa vào trang
                         fields="name,email"
                        callback={this.responseFacebook}
                        />
                        <GoogleLogin
                        clientId="329434956793-n9dbb8s2g0oj1idb0do1sqk844f0khuj.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
  />
                </div>
        )
        
    }
}


export default Login