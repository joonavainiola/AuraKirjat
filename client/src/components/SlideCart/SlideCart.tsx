import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../Context';
import "./SlideCart.css";
import SlideShoppingCart from './SlideShoppingCart';

const Cart = () => {
    // const [sidecart, setSidecart] = useState(false);
    const { token, cartItems, sideCart, setSideCart } = useAppContext();
    const showCart = () => setSideCart(!sideCart);


    return (
        <>
            <div className="cart">
                <Link to="#" className="cart-bar" onClick={showCart}>
                    <i className="fa fa-shopping-cart">
                        {(token && cartItems.length > 0) ?
                            <div className="cart-item-length">{cartItems.length}</div> :
                            undefined}
                    </i>
                    <p className="header__links__text">Ostoskori</p>
                </Link>
            </div>
            <div className={sideCart ? 'cart-overlay active' : 'cart-overlay'} onClick={showCart}>
            </div>
            <nav className={sideCart ? 'cart-menu active' : 'cart-menu'}>
                <div className='cart-toggle' onClick={showCart}>
                    <Link to='#' className='cart-bars'>
                        <i className="fa fa-times"></i>
                    </Link>
                </div>
                <ul className='cart-menu-items'>
                    <SlideShoppingCart sidecart={sideCart} setSidecart={setSideCart} />
                </ul>
            </nav>
        </>
    );
}

export default Cart;