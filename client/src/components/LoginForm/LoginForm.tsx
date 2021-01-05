import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { login } from '../../controllers/fetchFunctions';
import { useAppContext } from '../../Context';
import './LoginForm.css';

interface ILogin {
    closeLoginModal: () => void;
}

const LoginForm: React.FC<ILogin> = (props) => {
    const { closeLoginModal } = props;
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const { setIsLogin, setToken, getProducts } = useAppContext();
    const history = useHistory();

    const handleSubmit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        email: string,
        password: string
    ) => {
        event.preventDefault();
        const loginResult = await login(email, password);
        console.log(loginResult);
        if (loginResult.status === 200) {
            const data = await loginResult.json();
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setIsLogin(true);
                closeLoginModal();
                getProducts();
                history.push('/');
            } else {
                console.log("Wrong email or password");
            }
        } else {
            console.log("Wrong email or password");
        }
    };

    return (
        <div className="login">
            <div className="login__close" onClick={closeLoginModal}>
                <i className="fa fa-times"></i>
            </div>
            <form className="login__form">
                <h2>Kirjaudu sisään</h2>
                <div className="login__row">
                    <i className="fa fa-at"></i>
                    <input
                        type="text"
                        name="email"
                        onChange={event => setEmailText(event.target.value)}
                        placeholder="Sähköpostiosoite"
                        className="login__input"
                    />
                </div>
                <div className="login__row">
                    <i className="fa fa-lock"></i>
                    <input
                        type="password"
                        name="password"
                        onChange={event => setPasswordText(event.target.value)}
                        placeholder="Salasana"
                        className="login__input"
                    />
                </div>
                <button
                    onClick={(event) => handleSubmit(event, emailText, passwordText)}
                    className="login__button"
                >
                    Kirjaudu sisään
                </button>
            </form>
        </div>
    );
};

export default LoginForm;