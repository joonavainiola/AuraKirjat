import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchProducts, addProductToCart } from '../../controllers/fetchFunctions';
import { IProduct } from '../../interfaces';
import { useAppContext } from '../../Context';
import './SearchResults.css';


const SearchResults = () => {
    // get search query as a string, 'q' is the name of the search input field
    // for example '/haku?q=oliver'
    const query = new URLSearchParams(useLocation().search).get('q');
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);
    const { token, getProducts, sideCart, setSideCart } = useAppContext();

    const getBooksByQuery = async () => {
        if (query) {
            // search products by the search query
            const result = await searchProducts(query);
            if (result.status === 200) {
                const data = await result.json();
                // .. and set given data to the searchResults variable
                setSearchResults(data);
            }
        }
    }

    // call getBooksByQuery function once the page renders -> when you press search button
    useEffect(() => {
        getBooksByQuery();
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
        <div className="container">
            <div className="search__content">
                <p className="books__results__heading search__query">Hakutulokset: <b><i>{query}</i></b></p>
                <div className="books__results">
                    {searchResults.map((product) => {
                        return (
                            <div
                                className="book"
                                key={product.id}
                            >
                                <Link to={"/kirja/" + product.id}>
                                    <img src={product.path} alt={product.name}>
                                    </img>
                                </Link>
                                <div className="book__info">
                                    <Link to={"/kirja/" + product.id} className="book__name">
                                        {product.name}
                                    </Link>
                                    <p className="book__author">{product.author}</p>
                                    <p className="book__price">
                                        {product.price.toString().replace('.', ',')} €
                                    </p>
                                </div>
                                <button className="book__button" onClick={() => handleClick(product.id)}>Lisää ostoskoriin</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchResults;