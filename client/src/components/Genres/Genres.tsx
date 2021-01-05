import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { searchProductsByGenre, addProductToCart } from '../../controllers/fetchFunctions';
import { IProduct } from '../../interfaces';
import NotFound from '../NotFound/NotFound';
import './Genres.css';
import { useAppContext } from '../../Context';

// define type for the parameter of the route ../genret/:genre
// for example genret/elämäkerrat, where elämäkerrat is a string
interface ParamTypes {
    genre: string
}

// there isn't sql table for genres yet, so this array is for testing
const bookGenres = [
    "kaunokirjallisuus",
    "nuortenkirjat",
    "lastenkirjat",
    "historia",
    "luonnontieteet",
    "ohjelmointi",
    "elämäkerrat",
    "ruoanlaitto",
    "runous",
    "kieltenopiskelu"
]

const Genres = () => {
    const { getProducts, sideCart, setSideCart } = useAppContext();
    // get given genre from the address bar
    const { genre } = useParams<ParamTypes>();
    // capitalize first letter of the genre parameter, used in the heading of the page
    const genreCapitalized = genre.charAt(0).toUpperCase() + genre.slice(1);
    // get index of the given genre from the bookGenres array
    // in this case 0 = elämäkerrat, 1 = lastenkirjat
    const genreIndex = bookGenres.indexOf(genre);
    const [booksByGenre, setBooksByGenre] = useState<IProduct[]>([]);
    const [arrange, setArrange] = useState<string>("arrange");

    const { token } = useAppContext();

    const getBooksByGenre = async () => {
        // search products by the search query
        const result = await searchProductsByGenre(genreIndex);
        if (result.status === 200) {
            const data = await result.json();
            // set given data to the booksByGenre variable
            setBooksByGenre(data);
        }
    }

    const handleClick = async (productId: number) => {
        if (token) {
            const result = await addProductToCart(productId, token);
            if (result.status === 200) {
                getProducts();
            }
        }
        setSideCart(!sideCart);
    }

    const arrangeBooks = (value: string) => {

        const byName = (a: { name: string }, b: { name: string }) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            }
            return comparison;
        }

        const lowToHigh = (a: { price: number }, b: { price: number }) => {
            const aNumber = Number(a.price);
            const bNumber = Number(b.price);
            if (aNumber < bNumber) {
                return -1;
            }
            if (aNumber > bNumber) {
                return 1;
            }
            return 0;
        }

        const highToLow = (a: { price: number }, b: { price: number }) => {
            const aNumber = Number(a.price);
            const bNumber = Number(b.price);
            if (aNumber < bNumber) {
                return 1;
            }
            if (aNumber > bNumber) {
                return -1;
            }
            return 0;
        }

        const copiedBooks = [...booksByGenre];

        if (value === "byname") {
            return setBooksByGenre(copiedBooks.sort(byName));
        } else if (value === "lowtohigh") {
            return setBooksByGenre(copiedBooks.sort(lowToHigh));
        } else if (value === "hightolow") {
            return setBooksByGenre(copiedBooks.sort(highToLow));
        }
    }

    // call getBooksByQuery function once the page renders or the genre parameter changes
    useEffect(() => {
        setArrange("arrange");
        getBooksByGenre();
    }, [genre]);

    useEffect(() => {
        arrangeBooks(arrange);
    }, [arrange]);

    return (
        <div className="container">
            {genreIndex >= 0 ?
                <div>
                    <div className="genres__content">
                        <h1 className="books__results__heading">{genreCapitalized}</h1>
                        <div className="books__results__arrange">
                            <select value={arrange} name="arrange" id="arrange" onChange={(event) => setArrange(event?.target.value)}>
                                <option value="arrange" className="grey" disabled>Järjestä</option>
                                <option value="byname">A-Z</option>
                                <option value="lowtohigh">Halvin ensin</option>
                                <option value="hightolow">Kallein ensin</option>
                            </select>
                        </div>
                        <div className="books__results" id="books">
                            {booksByGenre.map((product) => {
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
                :
                <NotFound />}
        </div >
    )
}

export default Genres;