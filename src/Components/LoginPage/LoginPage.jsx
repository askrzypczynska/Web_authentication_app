import './LoginPage.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const navigate = useNavigate();

    const [date, setDate] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState("");

    // Input state update
    function handleInputChange(e) {
        const { id, value } = e.target;
        setDate(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    function handleLogin(e){
        e.preventDefault();

        if (date.email === "") {
            setMessage("Wymagany email!");
            return; 
        } else if (date.password === "") {
            setMessage("Wymagane hasło!");
            return; 
        }

        let options = {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(date)
        }
        fetch('http://localhost:3001/login', options)
                .then(resp => resp.text())
                .then(resp => {
                    setMessage(resp);
                    let respSplice = resp.split(" ");

                    if (respSplice[0] === "Zalogowano") {
                        props.setLogedIn({
                            logedIn: true,
                            name: respSplice[1],
                            lastName: respSplice[2]
                        });

                        // Reset input values
                        setDate({
                            email: "",
                            password: ""
                        });

                        // Redirected to the Welcome Page
                        navigate('/welcome');
                    }
                })
    }

    return (
        <div className="LoginPage">
            <form onSubmit={handleLogin}> 
                <h2>Formularz logowania:</h2>
                <label>
                    <a>Adres e-mail:</a>
                    <input 
                        type="email" 
                        id="email"
                        value={date.email}
                        onChange={handleInputChange} 
                    />
                </label>
                <label>
                    <a>Hasło:</a>
                    <input 
                        type="password" 
                        id="password" 
                        value={date.password}
                        onChange={handleInputChange} 
                    />
                </label>
                <span className='errorMessage'>&nbsp;{message}</span>
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    )

}

export default LoginPage;