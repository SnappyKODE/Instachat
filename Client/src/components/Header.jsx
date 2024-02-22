import React, { useEffect, useState } from 'react'
import icon from '../img/icons8-chat-94.png'

const Header = ({socket,getMessage,getUser}) => {

    const [User,SetUser] = useState('')
    const [Display,SetDisplay] = useState(true);

    const handleChange = (e)=>{
        const value = e.target.value;
        SetUser(value);
    }

    useEffect(()=>{
        socket.on('leave',Uname=>{
            if(Uname){
                console.log('User left-',Uname);
                getMessage(`${Uname} left`,'center','');
            }
        })
        return () => socket.off('leave');
    },[socket])

    useEffect(()=>{
        socket.on('user-joined',(Uname)=>{
            console.log('User joined-',Uname)
            getMessage(`${Uname} joined`,'center','')
        })
        return () => socket.off('user-joined');
    },[socket])

    return (
        <div>
            <nav>
                <img className="logo" src={icon} alt="icon"/>
                <h1>InstaChat</h1>
            </nav>

            <form action="#" id="userForm" className={Display ? 'a' : 'remove'} onSubmit={(e)=>{
                e.preventDefault();
                console.log(User);
                SetDisplay(false)
                socket.emit('new-user-joined',User)
                getUser(User)
            }}>
                <input type="text" name="userName" id="userName" placeholder="Username.." required onChange={handleChange}/>
                <button type="submit" className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-120h80v120h640v-480H160v120H80v-120q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm300-140-56-58 83-82H80v-80h407l-83-82 56-58 180 180-180 180Z"/></svg>
                </button>
            </form>

            <div id="userInfo" className={Display ? 'remove' : 'a'}>
                <div><h2>Username : <span id="user">{User}</span></h2></div>
            </div>
        </div>
    )
}

export default Header
