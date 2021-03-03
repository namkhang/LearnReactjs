import React , {Component} from 'react';
import PropTypes from 'prop-types'
import './Traffic.css'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import cookies from 'js-cookie'
const RED = 0 ;
const ORANGE = 1 ;
const GREEN = 2;
class Traffic extends Component {
    constructor(props){ //truyen props vao ham khoi tao de su dung
        super(props);
            this.state = {
                currentColor : RED,
                time : this.props.time
            }
 
        } 

     nextColor(color){
        switch(color){
            case RED : return ORANGE ;
            case ORANGE : return GREEN;
            default : return RED;
        }
    }
    render(){
      /*   console.log(localStorage.getItem('login')); */
      const {currentColor} = this.state;
       if(cookies.get('idlogin')){
        return(
            <div className='TrafficLight'>
                <div className={classNames('bulb' , 'red' , {active : currentColor === 0})}></div>
                <div className={classNames('bulb' , 'orange' , {active : currentColor === 1})}></div>
                <div className={classNames('bulb' , 'green' , {active : currentColor === 2})}></div>
                <h2>Params cua path hien tai la :{this.props.match.params.id}</h2>
                <Link to='/'>Trang chinh</Link>
                
            </div>
        )    
       }
       else{
    
            window.location.href = 'http://localhost:3000/login'
       }

    
           
    }
    componentDidMount()
    {
          this.setState({
              currentColor : RED        
          })
     
    }

    componentDidUpdate(){
        console.log('didupdate');
        console.log(this.state.time);
        if(this.timer){
            clearInterval(this.timer);
        
        }
        this.timer= setInterval(()=>{
            if(this.state.currentColor === RED){
            this.setState({
                currentColor : this.nextColor(this.state.currentColor),
                time : 5000
            })
    
        }
            else if(this.state.currentColor === ORANGE){
                this.setState({
                    currentColor : this.nextColor(this.state.currentColor),
                    time : 8000
                })
            }
            else{
                this.setState({
                    currentColor : this.nextColor(this.state.currentColor),
                    time : 2000
                })
            }
     
        },this.state.time)
    }

    componentWillUnmount(){
        console.log('tam biet');
        if(this.timer)
        clearInterval(this.timer); //clear di interval khi component umount
    }

}

Traffic.propTypes = {  // quy dinh kieu du lieu cua props truyen vao    
    time : PropTypes.number
}
export default Traffic;