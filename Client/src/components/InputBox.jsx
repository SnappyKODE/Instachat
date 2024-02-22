import React, { useEffect, useState } from 'react'
import ding from '../img/ding.mp3'

const InputBox = ({socket,getMessage,user}) => {

    const [msg,SetMsg] = useState('')
    const audio =new Audio(ding);

    const handleChange = (e)=>{
        SetMsg(e.target.value)
    }

    useEffect(()=>{
        if(user){
            socket.on('recieve',(data)=>{
                console.log(`${data.name}:${data.message}`)
                getMessage(data.message,'left',data.name)
            })
            audio.play();
        }
        return () => socket.off('recieve');
    },[socket])

    return (
        <div className="send">
            <form action="#" id="sent-container" onSubmit={(e)=>{
                e.preventDefault();
                if(user){
                    socket.emit('send',{msg,user})
                    getMessage(msg,'right','You')
                }
                SetMsg('')
            }}>
                <input type="text" name="messageInp" id="messageInp" onChange={handleChange} value={msg}/>
                <button type="submit" className="btn" >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z"/></svg>
                </button>
            </form>
        </div>
    )
}

export default InputBox
