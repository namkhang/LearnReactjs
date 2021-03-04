import React , {useState ,useContext, useEffect} from 'react'
import io from 'socket.io-client';
import Context from '../ContextApi/context'
const socket = io('http://localhost:5000/')



export default function TestReactHook({title}){
    const[item ,setItem] = useState({name : 'Nguyen dang nam khang' , age : 16})
    function setName(){
            setItem({...item,name : 'Huynh Huu Phuc'})
    }
    function setAge(){
        setItem({...item ,age : 22})
    }
    function DoubleAge(){
        setItem(item => {return {...item,age : item.age + 1}}) // dùng theo cách này để xửa lý bất đồng bộ khi set nhiều state
        setItem(item => {return {...item,age : item.age + 1}})
    }
    function serverhello(){
        console.log('da bam');
        socket.emit('react-sayHi')
    }

    useEffect(()=>{
        console.log('da vao');
        socket.on('server-helloo' , (data)=>{
            alert(data)
        })
        return ()=>{
            console.log('tam biet');
        }
    },[item.name]) // [] này để chỉ được chạy khi nào effect sẽ được gọi

    const contextConsumer = useContext(Context);
    return (
        <div>
        <h2>{`hello ${item.name}`}</h2>
        <h2>{`${item.age}`}</h2>
        <h2>{`${title} ${contextConsumer.name}`}</h2>
        <h2>{contextConsumer.number}</h2>
        <button onClick={contextConsumer.helloContext}>useContext</button>
        <button onClick={setName}>change name</button>
        <button onClick={setAge}>change age</button>
        <button onClick={contextConsumer.changeNumber}>change number</button>
        <button onClick={DoubleAge}>Double age</button>
        <button onClick={serverhello}>Call Socket</button>
        </div>
    )
}