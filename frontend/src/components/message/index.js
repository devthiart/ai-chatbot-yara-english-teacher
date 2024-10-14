import React from 'react';

const Message = ({ message }) => {
    const myStyle = "message " + message.style
    const hiddenTag = message.content ? false : true

    return (
        <div className={myStyle} hidden={hiddenTag}>
            <span className='container-author'>
                <img className='photo' src={message.imageUrl} alt="Yara" />
                <p className='author-name'>{message.author}:</p>
            </span>
            <p>{message.content}</p>
        </div>
    );
};

export default Message;
