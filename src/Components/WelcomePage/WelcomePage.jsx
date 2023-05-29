import './WelcomePage.css'
import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage(props) {

    function handlerLogout() {
        props.setLogedIn({    
            logedIn: false,
            name: "",
            lastName: ""})
    }

    return (
        <div className="WelcomePage">
            <div className='WelcomePageBox'>
                <h1>Witaj {props.logedIn.name} {props.logedIn.lastName}!</h1>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime soluta voluptates dolor dolore perferendis aperiam      voluptatibus tempora temporibus nulla quae, modi quaerat voluptate fuga commodi quis sequi quasi? Corrupti, officia!
                </span>

                {props.logedIn.logedIn === true ? <button onClick={handlerLogout}>Wyloguj</button> : <Link to="/login" className="LinkNoUnderline"><button>Zaloguj się!</button></Link>} 
            </div>
        </div>
    )

}

export default WelcomePage;