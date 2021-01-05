import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { signUp } from '../../controllers/fetchFunctions';
import './SignUpForm.css';

interface ISignUp {
    closeSignupModal: () => void;
}

interface ValidatorError {
    value: string,
    msg: string,
    param: string,
    location: string;
}

const SignUpForm: React.FC<ISignUp> = (props) => {
    const { closeSignupModal } = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const history = useHistory();

    const handleSubmit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) => {
        event.preventDefault();
        const fullName = `${firstName} ${lastName}`;
        const signUpResult = await signUp(fullName, email, password);
        const data = await signUpResult.json();
        if (data.errors) {
            const errorMessages = data.errors.map((error: ValidatorError) => error.msg);
            setErrorMessage(errorMessages);
            console.log('signUpResult', data.errors);
        }
        if (signUpResult.status === 200) {
            // sulkee modaalin ja siirtää käyttäjän signupsuccesfull routeen 
            console.log(data.msg);
            setErrorMessage([]);
            closeSignupModal();
            history.push('/tervetuloa');
        }
    };

    return (
        <div className="signup">
            <div className="signup__close" onClick={closeSignupModal}>
                <i className="fa fa-times"></i>
            </div>
            <form className="signup__form">
                <h2>Luo uusi tili</h2>
                <div className="signup__row">
                    <i className="fa fa-user-o"></i>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Etunimi"
                        onChange={event => setFirstName(event.target.value)}
                        className="signup__input"
                    />
                </div>
                <div className="signup__row">
                    <i className="fa fa-user-o"></i>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Sukunimi"
                        onChange={event => setLastName(event.target.value)}
                        className="signup__input"
                    />
                </div>
                <div className="signup__row">
                    <i className="fa fa-at"></i>
                    <input
                        type="text"
                        name="email"
                        placeholder="Sähköpostiosoite"
                        onChange={event => setEmail(event.target.value)}
                        className="signup__input"
                    />
                </div>
                <div className="signup__row">
                    <i className="fa fa-lock"></i>
                    <input
                        type="password"
                        name="password"
                        placeholder="Salasana"
                        onChange={event => setPassword(event.target.value)}
                        className="signup__input"
                    />
                </div>
                <p className="signup__error">{errorMessage[0]}</p>
                <button
                    onClick={(event) => handleSubmit(event, firstName, lastName, email, password)}
                    className="signup__button"
                >
                    Rekisteröidy
                </button>
                {/* {errorMessage.map((error, index) => {
                    return <p key={index}>{error}</p>
                })} */}
            </form>
        </div>
    );
};

export default SignUpForm;