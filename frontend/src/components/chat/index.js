import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Message from '../message';
import LoadingDots from '../loadingDots';

const socket = io('http://localhost:5000/'); // Endereço do Backend

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatContainerRef = useRef(null);
    const [hiddenLoad, setHiddenLoad] = useState(true);
    
    useEffect(() => {
        socket.on('response', (message) => {
            console.log(message)
            setHiddenLoad(true);
        
            const messageFromIA = {
                'style': 'ai-message',
                'imageUrl': '/images/yara.png',
                'author': 'Yara',
                'content': message.response.response
            }

            setMessages((prevMessages) => {
                return [...prevMessages, messageFromIA]
            });
        });

        return () => {
            socket.off('response');
        };
    }, []);

    useEffect(() => {
        scrollChatToBottom();
    }, [messages, hiddenLoad]);

    const sendMessage = () => {
        const messageFromUser = {
            'style': 'user-message',
            'imageUrl': '/images/profile.png',
            'author': 'Você',
            'content': input
        }
        setMessages((prevMessages) => [...prevMessages, messageFromUser]);
        if (input.trim()) {
            console.log(input)
            socket.emit('message', input);
            setInput('');
        }
        setHiddenLoad(false)
    };

    const scrollChatToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    return (
        <div className="chat-container" >
            <div ref={chatContainerRef} className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
                {!hiddenLoad && <LoadingDots />}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
                />
                <button onClick={sendMessage} disabled={false}>Enviar</button>
            </div>
        </div>
    );
};

export default Chat;
