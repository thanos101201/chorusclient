import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import History from './Components/History';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Question from './Components/Question';
import Otp from './Components/Otp';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/history' element={<History />} />
      <Route path='/question' element={<Question />} />
      <Route path='/sign' element={<Sign />} />
      <Route path='/home' element={<Home />} />
      <Route path='/otp' element={<Otp />} />
    </Routes>
  );
}

export default App;
