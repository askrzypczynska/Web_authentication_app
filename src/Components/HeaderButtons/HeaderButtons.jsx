import './HeaderButtons.css';
import React from "react";
import { Link } from 'react-router-dom';

function HeaderButtons() {

    return (
        <div className="HeaderButtons">
            <Link to="/"><button>Rejestracja</button></Link>
            <Link to="/login"><button>Logowanie</button></Link>
            <Link to="/welcome"><button>Główna Strona</button></Link>
        </div>
    )

}

export default HeaderButtons;
