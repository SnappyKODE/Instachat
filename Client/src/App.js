
import { io } from "socket.io-client";
import { useState } from "react";
import Header from "./components/Header";
import Message from "./components/Message";
import InputBox from "./components/InputBox";

function App() {

  const [msg,setMsg]= useState([])
  const [user,setUser] =useState('')

  let socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000');

  const getMessage = (val,pos,name)=>{
    setMsg((prev)=>{
      return [...prev,{
        msg:val,
        position:pos,
        name:name
      }]
    })
  }

  const getUser =(val)=>{
    setUser(val)
  }

  return (
    <>
      <Header getMessage={getMessage} socket={socket} getUser={getUser}/>
      <div className="container">
        {user && 
          msg.map((d,i)=>{
            return <Message 
                      message={d.msg}
                      key={i} 
                      id={i} 
                      position={d.position} 
                      userName={d.name}
                    />
          })
        }
      </div>
      <InputBox getMessage={getMessage} socket={socket} user={user}/>
    </>
  );
}

export default App;
