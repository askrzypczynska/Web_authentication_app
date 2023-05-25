import './RegistrationPage.css';
import React, { useState } from "react";
import Validation from './Validation';

function RegistrationPage(props) {

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Input state update
    function handleInputChange(e) {
        const { id, value } = e.target;
        props.setValues(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    // Input data validation
    function handleValidation(e) {
        e.preventDefault();
        const validationErrors = Validation(props.values);
        setErrors(validationErrors);

        // Sending to the database
        if(Object.keys(validationErrors).length === 0){

            let options = {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    
                },
                body: JSON.stringify(props.values)
            }
            fetch('http://localhost:3001/sendForm', options)
                .then(resp => resp.text())
                .then(resp => {
                    setMessage(resp);
                    if (resp === "Rejestracja przebiegła pomyślnie.") {
                        // Reset input values
                        props.setValues({
                            name: "",
                            lastName: "",
                            email: "",
                            password: ""
                        });
                    }
                })
        }
    }

    return (
        <div className="RegistrationPage">
            <form onSubmit={handleValidation}> 
                <h2>Formularz rejestracyjny:</h2>
                <label>
                    <a>Imię:</a>
                    <input 
                        type="text" 
                        id="name"
                        value={props.values.name}
                        onChange={handleInputChange} />
                    <p className='error'>&nbsp;{errors.name}</p>
                </label>
                <label>
                    <a>Nazwisko:</a>
                    <input 
                        type="text" 
                        id="lastName" 
                        value={props.values.lastName}
                        onChange={handleInputChange} />
                    <p className='error'>&nbsp;{errors.lastName}</p>
                </label>
                <label>
                    <a>Adres email:</a>
                    <input 
                        type="email" 
                        id="email" 
                        value={props.values.email}
                        onChange={handleInputChange} />
                    <p className='error'>&nbsp;{errors.email}</p>
                </label>
                <label>
                    <a>Hasło:</a>
                    <input 
                        type="password" 
                        id="password" 
                        value={props.values.password}
                        onChange={handleInputChange} />
                    <p className='error'>&nbsp;{errors.password}</p>
                </label>
                <p className='message'>&nbsp;{message}</p>
                <button type="submit">Zarejestruj</button>
            </form>
            
        </div>
    )

}

export default RegistrationPage;