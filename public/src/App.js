import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Register } from './pages/Register.js';
import { Login } from './pages/Login.js';
import { Chat } from './pages/Chat.js';
import { Profile } from './pages/Profile.js';
import { Room } from './pages/Room.js';

function App() {
  return (
        <>
           <Routes>
                 <Route path='/register' element={<Register/>} />
                 <Route path='/' element={<Login/>} />
                 <Route path='/profile' element={<Profile/>} />
                 <Route path='/chat' element={<Chat/>} />
                 <Route path='/room' element={<Room/>} />
          </Routes>   
        </>
      
  );
}

export default App;
