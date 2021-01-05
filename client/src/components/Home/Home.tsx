import React, { useEffect, useState } from 'react';
import { getProductById, addProductToCart } from '../../controllers/fetchFunctions';
import { IProduct } from '../../interfaces';
import { useAppContext } from '../../Context';
import './Home.css';

const Home = () => {

    const [books, setBooks] = useState<IProduct[]>([]);
    const dayNumber = new Date().getDate();
    const { token, getProducts, sideCart, setSideCart } = useAppContext();

    const getBookById = async () => {
        const result = await getProductById(dayNumber.toString());
        console.log(result);
        if (result.status === 200) {
            const data = await result.json();
            if (data.length > 0) {
                // set given data to the books variable
                setBooks(data);
            }
        }
    }

    useEffect(() => {
        getBookById();
    }, []);

    const handleClick = async (productId: number) => {
        if (token) {
            const result = await addProductToCart(productId, token);
            if (result.status === 200) {
                getProducts();
            }
        }
        setSideCart(!sideCart);
    }

    return (
        <div className="home__container">
            <div className="home__content">
                <div className="home__offer">
                    <div className="home__offer__text">
                        <div className="merryxmas">
                            <p className="merryxmas__crazy">crazy</p>
                            <p className="merryxmas__merryxmas">
                                <span className="merryxmas__merry">Merry</span> Xmas!
                            </p>
                        </div>
                        <div className="xmasoffer">
                            <div className="xmasoffer__border">
                                <div className="xmasoffer__text">
                                    <p className="xmasoffer__code">koodilla <span>JOULU20</span></p>
                                    <p className="xmasoffer__percentage">-20%</p>
                                    <p className="xmasoffer__products"><span>kaikista</span> kirjoista!</p>
                                    <p className="xmasoffer__date">Tarjous voimassa 17.12. asti.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home__book">
                    <div className="home__book__aura">
                        <p>AuraKirjat suosittelee:</p>
                        <h1>Päivän kirja</h1>
                    </div>
                    {books.map(book => {
                        return (
                            <div className="home__bookinfo" key={book.id}>
                                <div className="home__bookinfo__img">
                                    <img src={book.path} alt={book.name}></img>
                                </div>
                                <div className="home__bookinfo__info">
                                    <h1 className="home__bookinfo__name">
                                        {book.name}
                                    </h1>
                                    <p className="home__bookinfo__author">
                                        <span>Kirjailija:</span> {book.author}
                                    </p>
                                    <p className="home__bookinfo__year">
                                        <span>Julkaisuvuosi:</span> {book.published}
                                    </p>
                                    <p className="home__bookinfo__isbn">
                                        <span>ISBN:</span> {book.product_code}
                                    </p>
                                    <p className="home__bookinfo__pages">
                                        <span>Sivumäärä:</span> {book.pages}
                                    </p>
                                    <h2 className="home__bookinfo__price">
                                        {book.price.toString().replace('.', ',')} €
                                    </h2>
                                    <h3 className="home__bookinfo__desc">Kuvaus:</h3>
                                    <p className="home__bookinfo__desctext">{book.description}</p>
                                    <button className="home__bookinfo__button" onClick={() => handleClick(book.id)}>Lisää ostoskoriin</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;