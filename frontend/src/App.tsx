import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import socket from "./socket";
import { JoinPage } from './pages/joinPage';
import { GamePage } from './pages/gamePage';
import { useStore } from './stores/useStore';

import './App.css';

const App = () => {
    const store = useStore();
    
    socket.on('updateUsers', () => {
        store.getUsers();
    })

    return (
        <Router>
            <Routes>
                <Route path='/' element={<JoinPage />} />
                <Route path='/room' element={<GamePage />} />
            </Routes>
        </Router>
    )
};

export default App;
