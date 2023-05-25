import './App.css';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
import LoginPage from './Components/LoginPage/LoginPage';
import HeaderButtons from './Components/HeaderButtons/HeaderButtons';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [logedIn, setLogedIn] = useState({
    logedIn: false,
    name: "",
    lastName: ""
  });

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderButtons />
        <Routes>
          <Route path="/" element={<RegistrationPage setValues={setValues} values={values}/>} />
          <Route path="/login" element={<LoginPage setLogedIn={setLogedIn} />}/>
          <Route path="/welcome" element={<WelcomePage logedIn={logedIn} setLogedIn={setLogedIn}/>} />

        </Routes>
      </div>
    </BrowserRouter>
  )};


export default App;
