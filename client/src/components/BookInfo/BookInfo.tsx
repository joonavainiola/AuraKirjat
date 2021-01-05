import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../controllers/fetchFunctions';
import { IProduct } from '../../interfaces';
import NotFound from '../NotFound/NotFound';
import { addProductToCart } from '../../controllers/fetchFunctions';
import { useAppContext } from '../../Context';
import './BookInfo.css';

interface ParamTypes {
    id: string;
}

const BookInfo = () => {
    // get given id from the address bar
    const { id } = useParams<ParamTypes>();
    const [books, setBooks] = useState<IProduct[]>([]);
    // notFound is set as an JSX.Element (NotFound component) if there isn't ..
    // .. books with the given id
    const [notFound, setNotFound] = useState<JSX.Element>();
    const { token, getProducts, sideCart, setSideCart } = useAppContext();

    const getBookById = async () => {
        // get product by variable id
        const result = await getProductById(id);
        console.log(result);
        if (result.status === 200) {
            const data = await result.json();
            if (data.length > 0) {
                // set given data to the books variable
                setBooks(data);
            } else {
                // notFound is set as an JSX.Element (NotFound component) if there isn't ..
                // .. books with the given id
                setNotFound(<NotFound />)
            }
        }
    }

    // call getBookById function once the page renders or the id parameter changes
    useEffect(() => {
        getBookById();
    }, [id]);

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
        <div className="container">
            {books.length === 1 ?
                <div className="bookinfo__content">
                    {books.map(book => {
                        return (
                            <div className="bookinfo" key={book.id}>
                                <div className="bookinfo__img">
                                    <img src={book.path} alt={book.name}></img>
                                </div>
                                <div className="bookinfo__info">
                                    <h1 className="bookinfo__name">
                                        {book.name}
                                    </h1>
                                    <p className="bookinfo__author">
                                        <span>Kirjailija:</span> {book.author}
                                    </p>
                                    <p className="bookinfo__year">
                                        <span>Julkaisuvuosi:</span> {book.published}
                                    </p>
                                    <p className="bookinfo__isbn">
                                        <span>ISBN:</span> {book.product_code}
                                    </p>
                                    <p className="bookinfo__pages">
                                        <span>Sivumäärä:</span> {book.pages}
                                    </p>
                                    <h2 className="bookinfo__price">
                                        {book.price.toString().replace('.', ',')} €
                                    </h2>
                                    <h3 className="bookinfo__desc">Kuvaus:</h3>
                                    <p className="bookinfo__desctext">{book.description}</p>
                                    <button className="bookinfo__button" onClick={() => handleClick(book.id)}>Lisää ostoskoriin</button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                : notFound}
        </div>
    )
}

export default BookInfo;