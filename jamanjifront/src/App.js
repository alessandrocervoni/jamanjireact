
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import { atom } from 'jotai';

export const currentUser = atom();

function App() {
  return (
        <>
          <BrowserRouter>
          <Routes>

            <Route index element={<Login/>} />
    
          </Routes>
          </BrowserRouter>
        </>
  );
}

export default App;
