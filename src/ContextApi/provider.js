import React, {Component} from 'react'
import Context from '../ContextApi/context'

export default class Provider extends Component{
    constructor(props){
        super(props)
        this.state = {
            number : 50
        }
    }
    helloContext(){
        alert('hello ConText API')
    }
    render(){
        return(
            <Context.Provider value={{
                name : 'Nguyễn Đăng Nam Khang',
                helloContext : this.helloContext.bind(this),
                number : this.state.number
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}