import { useRef } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/user';

const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 960px;
    min-height: 100px;
    margin: 10px auto 0 auto;
    background: linear-gradient(180deg, rgba(236,38,255,1) 0%, rgba(161,35,232,1) 100%);
    box-shadow: 10px 10px 73px -21px rgba(0,0,0,0.68);
    border-radius: 5px;
    padding: 5px;
`;

const RegisterInput = styled.input`
    border: 2px dotted #CCCCCC;
    border-radius:5px; 
    padding:6px; 
    font-size:25px; 
    box-shadow: 0px 0px 5px 0px rgba(42,42,42,.75); 
    text-shadow:1px 2px 4px rgba(42,42,42,.19); 
    font-weight:bold;
    flex-grow: 2;
    &:focus {
        outline: none;
    }
`;

const RegisterButton = styled.button`
    width: 100px;
    background: #A123E8;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 15px;
    font-weight: bold;
    color: white;
    &:hover {
        transition: all .1s ease;
        box-shadow: 0 0 0 0 #fff, 0 0 0 1px #EC26FF;
    }
`;

const RegisterForm = styled.form`
    display: flex;
    gap: 10px;
`;

const Header = styled.h1`
    margin: 0 auto 5px 5px;
    ${({ $color }) => $color && `color: ${$color}`};
`;

function RegisterUser({ userRegHandler }) {
    const userRef = useRef();

    const registerUserMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: senderId => userRegHandler(senderId, userRef.current.value)
    });

    const onSubmit = e => {
        e.preventDefault();
        registerUserMutation.mutate({
            value: userRef.current.value
        });
    };
    
    return <RegisterContainer>
        <Header $color={'white'}>SimpleChat 💬</Header>
        <RegisterForm onSubmit={onSubmit}>
            <RegisterInput
                id='userName'
                ref={userRef} 
            />
            <RegisterButton type='submit'>Register</RegisterButton>
        </RegisterForm>
    </RegisterContainer>;
}

export default RegisterUser;