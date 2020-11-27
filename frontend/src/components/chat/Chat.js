import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import ChatIcon from '@material-ui/icons/Chat';
import CancelIcon from '@material-ui/icons/Cancel';

const socket = io('http://localhost:5000', {
    transports: ['websocket'],
    forceNew: false
})


function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setAllMessages] = useState([]);
    const [chatExp, setChatExp] = useState(false);

    useEffect(() => {
        socket.on('incoming-msg', (data) => {
            console.log('data: ' + data);
            setAllMessages([...messages, data]);
        })
    }, [messages]);


    return (

        (!chatExp) ? (
            <ChatIcon className="chatIcon" onClick={() => { setChatExp(!chatExp) }} />
        ) : (
                <div className="chat">
                    <div className="chatClose">
                        <CancelIcon className="chatCloseIcon" onClick={() => { setChatExp(!chatExp) }} />
                    </div>
                    <div className="chatScreen">
                        {
                            messages.map(msg => (
                                <div className="eachMsg">
                                    <h3>{msg}</h3>
                                </div>

                            ))
                        }
                    </div>
                    <div className="enterMsg">
                        <form className="enterMsgForm" onSubmit={(e) => {
                            e.preventDefault();
                            socket.emit('message', message)
                            setMessage('');
                        }

                        }>
                            <input placeholder='Type your message..' onChange={(e) => { setMessage(e.target.value) }} value={message} type="text" />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            )

    )
}

export default Chat;
