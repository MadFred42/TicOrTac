import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../../stores/useStore';

import './joinForm.scss';

export const JoinForm = observer(() => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const store = useStore();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsername('');
        store.sendUsername(username);
        navigate('/room');
    };

    const inputHandler = (event: React.FormEvent) => {
        setUsername((event.target as HTMLInputElement).value)
    };

    return (
        <form className="tic-tac__form" onSubmit={submitHandler}>
                <input className="tic-tac__input" onChange={inputHandler} type="text" value={username}></input>
                <button className="tic-tac__button" type="submit">Join</button>
        </form>
    )
});