import styled from 'styled-components';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addChat } from '../api/chat';

const SendMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 10vh;
    background: linear-gradient(180deg, rgba(236,38,255,1) 0%, rgba(161,35,232,1) 100%);
    box-shadow: 10px 10px 73px -21px rgba(0,0,0,0.68);
    border-radius: 5px;
    padding: 5px;
`;

const MessageInput = styled.input`
    border: 2px dotted #CCCCCC;
    border-radius:5px; 
    padding:6px; 
    font-size:20px; 
    box-shadow: 0px 0px 5px 0px rgba(42,42,42,.75); 
    text-shadow:1px 2px 4px rgba(42,42,42,.19); 
    font-weight:bold;
    flex-grow: 2;
    &:focus {
        outline: none;
    }
`;

const MessageButton = styled.button`
    width: 100px;
    background: #A123E8;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 15px;
    font-weight: bold;
    color: white;
    &:hover {
        transition: all .5s ease;
        background: #EC26FF;
    }
`;

const MessageForm = styled.form`
    display: flex;
    gap: 10px;
`;


function SendMessage({ senderId, senderName }) {
    const messageRef = useRef();
    const queryClient = useQueryClient();

    const addChatMutation = useMutation({
        mutationFn: addChat,
        onSuccess: data => { queryClient.invalidateQueries(['chats']) }
    });

    const onSubmit = e => {
        e.preventDefault();
        addChatMutation.mutate({
            message: messageRef.current.value,
            senderName: senderName,
            senderId: senderId
        });
        messageRef.current.value = '';
    };
    
    return <SendMessageContainer>
        <MessageForm onSubmit={onSubmit}>
            <MessageInput
                id='message'
                ref={messageRef} 
            />
            <MessageButton type='submit'>
                <i className='bi bi-chat-left-text' />
            </MessageButton>
        </MessageForm>
    </SendMessageContainer>;
}

export default SendMessage;