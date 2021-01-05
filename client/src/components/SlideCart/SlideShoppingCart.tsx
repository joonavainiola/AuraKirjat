import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../Context';
import { deleteProductFromCart, orderProducts } from '../../controllers/fetchFunctions';
import './SlideShoppingCart.css';

interface ISlideShoppingCart {
    sidecart: boolean,
    setSidecart: (value: boolean) => void
}

const SlideShoppingCart: React.FC<ISlideShoppingCart> = (props) => {
    const { sidecart, setSidecart } = props;
    const { token, cartItems, getProducts } = useAppContext();
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

    useEffect(() => {
        getProducts();
    }, []);

    const history = useHistory();

    const handleClick = () => {
        setSidecart(!sidecart);
        history.push('/kassa');
    }

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


    return (
        <div className="shoppingcart">
            <div className="shoppingcart__heading">
                <p>Ostoskori</p>
            </div>
            {/* <button onClick={testOrder}>Tilaa</button> */}
            {token ?
                <>
                    {cartItems.length > 0 ?
                        <>
                            <div className="shoppingcart__items">
                                {cartItems.map((element, index) => {
                                    return (
                                        <div className="shoppingcart__item" key={element.book.id + index}>
                                            <div className="shoppingcart__item__img">
                                                <img src={element.book.path} alt={element.book.name}></img>
                                            </div>
                                            <div className="shoppingcart__item__info">
                                                <p className="shoppingcart__item__name">
                                                    {element.book.name}
                                                </p>
                                                <p className="shoppingcart__item__author">
                                                    {element.book.author}
                                                </p>
                                                <p className="shoppingcart__item__price">
                                                    {element.price.toString().replace('.', ',')
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
                            <div className="shoppingcart__links">
                                <button className="shoppingcart__button" onClick={handleClick}>Kassalle</button>
                            </div>
                        </> :
                        <h3 className="shoppingcart__infotext">Ostoskorisi on tyhjä.</h3>
                    }
                </> :
                <h3 className="shoppingcart__infotext">Kirjaudu sisään lisätäksesi tuotteita ostoskoriin.</h3>
            }
            {/* {CartLinks.map((item, idx) => {
                return (
                    <li key={idx} className={item.className}>
                        <Link to={item.path}>
                            <span onClick={handleClick}>{item.title}</span>
                        </Link>
                    </li>

                )
            })} */}
        </div>
    )
}

export default SlideShoppingCart;