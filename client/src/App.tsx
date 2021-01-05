import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Context from './Context';
import Home from './components/Home/Home';
import Genres from './components/Genres/Genres';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import SearchResults from './components/SearchResults/SearchResults';
import BookInfo from './components/BookInfo/BookInfo';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import SignUpSuccessful from './components/SignUpSuccessful/SignUpSuccessful';
import NotFound from './components/NotFound/NotFound';
import { ICartProduct, IUser } from './interfaces';
import { getProductsFromCart, getOwnProfile } from './controllers/fetchFunctions';

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [sideCart, setSideCart] = useState<boolean>(false);

    const [toggleMenu, setToggleMenu] = useState(false);

    const [cartItems, setCartItems] = useState<ICartProduct[]>([]);

    const getProducts = async () => {
        if (token) {
            const result = await getProductsFromCart(token);
            if (result.status === 200) {
                const data = await result.json();
                setCartItems(data);
            }
        } else {
            setCartItems([]);
        }
    }

    // const filterItems = () => {
    //     let copiedData: ICartProduct[] = [...cartItems];
    //     let newData: ICartProduct[] = [];

    //     // for (let i = newData.length; i >= 0; i--) {
    //     //     const findIndex = newData.findIndex(elem => {
    //     //         return elem.book.product_code === newData[i].book.product_code;
    //     //     })
    //     //     if (findIndex < i && findIndex >= 0) {
    //     //         newData[i].book.quantity = newData[i].book.quantity + 1;
    //     //     }
    //     // }

    //     for (let i = 0; i < copiedData.length; i++) {
    //         const filtered = copiedData.filter(el => {
    //             return el.book.product_code === copiedData[i].book.product_code;
    //         });
    //         if (filtered.length > 1) {
    //             filtered[0].quantity = filtered.length;
    //             filtered[0].price = (Number(filtered[0].book.price) * filtered.length);
    //         }
    //         newData.push(filtered[0]);
    //     }

    //     const neww = newData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
    //     setCartItems(neww);
    // }

    const getProfile = async () => {
        if (token) {
            const result = await getOwnProfile(token);
            if (result.status === 200) {
                const userData = await result.json();
                setCurrentUser(userData);
            }
        } else {
            setCurrentUser(null);
        }
    }

    useEffect(() => {
        getProfile();
        getProducts();
    }, [token]);

    return (
        <Context.Provider value={{
            isLogin,
            setIsLogin,
            token,
            setToken,
            cartItems,
            getProducts,
            getProfile,
            currentUser,
            sideCart,
            setSideCart
        }} >
            <Router>
                <div className="App">
                    <Header
                        toggleMenu={toggleMenu}
                        setToggleMenu={setToggleMenu}
                    />
                    <div className="App__container">
                        <Sidebar
                            toggleMenu={toggleMenu}
                            setToggleMenu={setToggleMenu}
                        />
                        <div className="App__content">
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route exact path="/genret/:genre">
                                    <Genres />
                                </Route>
                                <Route exact path="/haku">
                                    <SearchResults />
                                </Route>
                                <Route exact path="/kirja/:id">
                                    <BookInfo />
                                </Route>
                                <Route exact path="/profiili">
                                    <Profile />
                                </Route>
                                <Route exact path="/kassa">
                                    <Checkout />
                                </Route>
                                <Route exact path="/tervetuloa">
                                    <SignUpSuccessful />
                                </Route>
                                <Route path="*">
                                    <NotFound />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router >
        </ Context.Provider >
    );
}

export default App;
