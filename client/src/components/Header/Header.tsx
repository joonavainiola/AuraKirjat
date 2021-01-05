import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../Context';
import './Header.css';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import logo from '../../logo_valko2.png';
import Cart from '../../components/SlideCart/SlideCart';
import { checkToken, checkAuth } from '../../controllers/fetchFunctions';

Modal.setAppElement('#root');

interface IHeader {
    toggleMenu: boolean,
    setToggleMenu: (value: boolean) => void
}

const Header: React.FC<IHeader> = (props) => {
    const { toggleMenu, setToggleMenu } = props;
    const { isLogin, setIsLogin, setToken, getProducts, getProfile } = useAppContext();

    const [loginModalIsOpen, setLoginIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupIsOpen] = useState(false);

    const checkAuthentication = async () => {
        const token = checkToken();
        if (token) {
            checkAuth(token)
                .then(result => result.status === 200 ? setIsLogin(true) : setIsLogin(false));
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    function openLoginModal() {
        setLoginIsOpen(true);
    }

    function closeLoginModal() {
        setLoginIsOpen(false);
    }

    function openSignupModal() {
        setSignupIsOpen(true);
    }

    function closeSignupModal() {
        setSignupIsOpen(false);
    }

    const logout: () => void = () => {
        setIsLogin(false);
        localStorage.removeItem('token');
        setToken(null);
        getProducts();
    };

    const Modals = () => {
        return (
            <>
                <div className="header__login" onClick={openLoginModal}>
                    <i className="fa fa-sign-in"></i>
                    <p className="header__links__text">Kirjaudu</p>
                </div>
                <div className="header__signin" onClick={openSignupModal}>
                    <i className="fa fa-user-plus"></i>
                    <p className="header__links__text">Rekisteröidy</p>
                </div>
                {/* <div onClick={openLoginModal}>
                    <div className="header_link">
                        <p>Login</p>
                    </div>
                </div>
                <div onClick={openSignupModal}>
                    <div className="header_link">
                        <p>Sign Up</p>
                    </div>
                </div> */}
                <Modal
                    isOpen={loginModalIsOpen}
                    onRequestClose={closeLoginModal}
                    className="modal"
                    overlayClassName="overlay"
                    shouldFocusAfterRender={false}
                >
                    <LoginForm closeLoginModal={closeLoginModal} />
                </Modal>
                <Modal
                    isOpen={signupModalIsOpen}
                    onRequestClose={closeSignupModal}
                    className="modal"
                    overlayClassName="overlay"
                    shouldFocusAfterRender={false}
                >
                    <SignUpForm closeSignupModal={closeSignupModal} />
                </Modal>
            </>
        )
    }

    const LoggedIn = () => {
        return (
            <>
                <Link to="/profiili" className="header__mypage">
                    <i className="fa fa-user"></i>
                    <p className="header__links__text">Profiili</p>
                </Link>
                <div className="header__logout" onClick={logout}>
                    <i className="fa fa-sign-out"></i>
                    <p className="header__links__text">Kirjaudu ulos</p>
                </div>
            </>
        )
    }

    return (
        <div className="header__container">
            <div className="header__content">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="AuraKirjat"></img>
                    </Link>
                </div>
                <form action="/haku" className="header__form">
                    <input
                        type="text"
                        name="q"
                        placeholder="Hae kirjan nimen tai tekijän mukaan"
                        className="header__form__input"
                    />
                    <button type="submit" className="header__form__button">
                        <i className="fa fa-search"></i>
                    </button>
                </form>
                <div className="header__links">
                    <div
                        className="menu-button hide-button"
                        onClick={() => setToggleMenu(!toggleMenu)}
                    >
                        <i className="fa fa-bars"></i>
                    </div>
                    {isLogin ? <LoggedIn /> : <Modals />}
                    {/* <Link to="/ostoskori">
                        <i className="fa fa-shopping-cart"></i>
                    </Link> */}
                    <Cart />
                </div>
            </div>
            {/* <button onClick={logout}>Logout</button> */}
        </div>
    );
};

export default Header;