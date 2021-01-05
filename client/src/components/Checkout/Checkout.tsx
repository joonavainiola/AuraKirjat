import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../Context';
import { orderProducts, deleteProductFromCart, deleteAllProductsFromCart, getOwnProfile } from '../../controllers/fetchFunctions';
import userData from '../Profile/Profile';
import './Checkout.css';

const Checkout = () => {

    const { cartItems, token, getProducts, getProfile, currentUser } = useAppContext();
    const deliveryMethod = "Postipaketti"; // muutetaan lopuksi valittavaksi pudotusvalikosta
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [orderText, setOrderText] = useState("");
    const [cartSum, setCartSum] = useState(0);
    const [tax, setTax] = useState(0);
    const [withoutTax, setWithoutTax] = useState(0);

    const deleteProduct = async (cart_id: number) => {
        if (token) {
            const result = await deleteProductFromCart(cart_id, token);
            if (result.status === 200) {
                getProducts()
            }
        }
    }

    const userData = () => {
        if (currentUser) {
            setFullName(currentUser.fullName);
            setAddress(currentUser.address);
            setPostalCode(currentUser.postalCode);
            setPhone(currentUser.phone);
        }
        else {
            setFullName("");
            setAddress("");
            setPostalCode("");
            setPhone("");
        }
    }
    useEffect(() => {
        userData();
    }, [currentUser, token]);

    const cartProductsSum = () => {
        let sum = 0;
        if (token) {
            sum = cartItems
                .map(element => element.price * 100 / 100)
                .reduce(function (a, b) {
                    return a + b;
                }, 0);
        } else {
            return sum
        }
        setCartSum(sum)
    }

    const withTax = () => {
        let tax = (10 * cartSum / (100 + 10));
        setTax(tax);
    }
    const noTax = () => {
        let without = 100 * cartSum / (100 + 10);
        setWithoutTax(without);
    }

    useEffect(() => {
        noTax();
        withTax();
    }, [cartSum]);


    useEffect(() => {
        cartProductsSum()
    }, [cartItems]);


    const handleSubmit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        address: string,
        postalCode: string,
    ) => {
        event.preventDefault();
        if (token && address.length > 5 && postalCode.length === 5) {
            const deliveryAddress = `${address}`;
            const deliveryPostal = `${postalCode}`;
            const result = await orderProducts(deliveryAddress, deliveryPostal, deliveryMethod, token);
            if (result.status === 200) {
                // siirtyy tilauksen onnistumisesta kertovalle sivulle
                getProducts();
                getProfile();
                setOrderText("Kiitos tilauksesta!");
            }
        } else { setOrderText("Virhe toimitusosoitteessa tai postinumerossa !"); }
    };

    return (
        <div className="container">
            <div className="checkout__content">
                <div className="checkout__grid">
                    <div className="checkout__products">
                        {token ?
                            <>
                                {cartItems.length > 0 ?
                                    <>
                                        <h2>Ostoskorisi:</h2>
                                        <div className="checkout__items">
                                            {cartItems.map((element, index) => {
                                                return (
                                                    <div className="checkout__item" key={element.book.id + index}>
                                                        <div className="checkout__item__img">
                                                            <img src={element.book.path} alt={element.book.name}></img>
                                                        </div>
                                                        <div className="checkout__item__info">
                                                            <p className="checkout__item__name">
                                                                {element.book.name}
                                                            </p>
                                                            <p className="checkout__item__author">
                                                                {element.book.author}
                                                            </p>
                                                            <p className="checkout__item__price">
                                                                {element.book.price.toString().replace('.', ',')
                                                                } €
                                                            </p>
                                                            <i className="fa fa-trash" onClick={() => deleteProduct(element.id)}></i>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="shoppingcart__sum">
                                            <p>Yhteensä: </p>
                                            <p>{cartSum.toFixed(2).replace('.', ',')} €</p>
                                        </div>
                                        <div className="shoppingcart__tax">
                                            <p>Hinta ilman alv:<br />
                                                {withoutTax.toFixed(2).toString()} €</p>
                                            <p>Alv10% osuus:<br />
                                                {tax.toFixed(2).toString()} €</p>
                                        </div>
                                    </> :
                                    <h3 className="checkout__infotext">Ostoskorisi on tyhjä.</h3>
                                }
                            </> :
                            <h3 className="checkout__infotext">Kirjaudu sisään lisätäksesi tuotteita ostoskoriin.</h3>
                        }
                        {/* {cartItems.map((element, index) => {
                            return <p>{element.book.name}</p>;
                        })} */}
                    </div>
                    {cartItems.length > 0 ?
                        <div className="checkout__form">
                            <h2>Tilaus:</h2>
                            <form>
                                <label htmlFor={"address"}>Toimitusosoite:</label>
                                <input
                                    id={"address"}
                                    type="text"
                                    name="address"
                                    value={address}
                                    placeholder="Katuosoite"
                                    className="checkout__input"
                                    onChange={event => setAddress(event.target.value)}
                                />
                                <label htmlFor={"postal"}>Postinumero:</label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={postalCode}
                                    placeholder="Postinumero"
                                    className="checkout__input"
                                    onChange={event => setPostalCode(event.target.value)}
                                />

                                <p className="checkout__note">Toimitusosoite on sama kuin laskutusosoite.</p>
                                <button
                                    className="checkout__button"
                                    onClick={event => handleSubmit(event, address, postalCode)}
                                >
                                    Tilaa
                                </button>
                            </form>
                        </div> :
                        ""
                    }
                    <h3>{orderText}</h3>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
