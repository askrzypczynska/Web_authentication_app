import './WelcomePage.css'

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

                {props.logedIn.logedIn === true ? <button onClick={handlerLogout}>Wyloguj</button> : <p>Zaloguj się</p>} 
            </div>
        </div>
    )

}

export default WelcomePage;