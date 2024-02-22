import React from 'react'

const Message = (props) => {
    return (
        <>
            <div className={`message ${props.position}`}>
                {
                    props.userName && <div className='UserName'>{props.userName}</div>
                }
                <div>{props.message}</div>
            </div>
        </>
    )
}

export default Message
