import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../Context';
import { updateUser, getOrderHistory } from '../../controllers/fetchFunctions';
import { IOrders } from '../../interfaces';
import './Profile.css';


const Profile = () => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [updated, setUpdated] = useState("");
    const [orderHistory, setOrderHistory] = useState<IOrders[]>([]);

    const { currentUser, token, getProfile } = useAppContext();

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


    const getHistory = async () => {
        if (token) {
            const result = await getOrderHistory(token);
            if (result.status === 200) {
                const userData = await result.json();
                const flattenedArray = [].concat(...userData.orderHistory);
                setOrderHistory(flattenedArray);
            } else {
                console.log("Order failed", result.status);
            }
        } else {
            console.log("Token not found.");
            setOrderHistory([]);
        }
    }

    useEffect(() => {
        userData();
        getHistory();
    }, [currentUser, token]);

    const handleSubmit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        fullName: string,
        phone: string,
        address: string,
        postalCode: string,
    ) => {
        event.preventDefault();
        // const userData = await 
        if (token) {
            const update = await updateUser(fullName, phone, address, postalCode, token);
            console.log(update.status);
            if (update.status === 200) {
                setUpdated("Tiedot päivitetty");
                getProfile();
            } else {
                setUpdated("Virhe");
            }
        } else {
            setUpdated("Et ole kirjautunut sisään");
        }
    };


    return (
        <div className="container">
            <div className="profile__content">
                <div className="profile__info">
                    <h2>Omat tiedot:</h2>
                    <form className="profile__form">
                        <label htmlFor={"fullName"}>Nimi:</label>
                        <input
                            id={"fullName"}
                            type="text"
                            name="Nimi"
                            value={fullName}
                            placeholder="Nimi"
                            onChange={event => setFullName(event.target.value)} />
                        <label htmlFor={"street"}>Katuosoite:</label>
                        <input
                            id={"street"}
                            type="text"
                            name="Osoite"
                            value={address}
                            placeholder="Katuosoite"
                            onChange={event => setAddress(event.target.value)} />
                        <label htmlFor={"postalCode"}>Postinumero: <input
                            id={"postalCode"}
                            type="text"
                            name="Postinumero"
                            value={postalCode}
                            placeholder="Postinumero"
                            onChange={event => setPostalCode(event.target.value)} />
                        </label>

                        <label htmlFor={"phone"}>Puhelinnumero:</label>
                        <input
                            id={"phone"}
                            type="text"
                            value={phone}
                            name="Puhelinnumero"
                            placeholder="Puhelinnumero"
                            onChange={event => setPhone(event.target.value)} />
                        <button
                            onClick={(event) => handleSubmit(event, fullName, phone, address, postalCode)}>
                            Tallenna
                        </button>
                    </form>
                    <p>{updated}</p>
                </div>
                <div className="history">
                    <h2>Tilaushistoria:</h2>
                    {token ?
                        orderHistory.length > 0 ?
                            <table className="history__orders">
                                <colgroup>
                                    <col className="w" />
                                    <col />
                                    <col className="w" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>Päivämäärä</th>
                                        <th>Nimi</th>
                                        <th>Summa</th>
                                    </tr>
                                </tbody>
                                {orderHistory.map(element => {
                                    return (
                                        <tbody key={element.id}>
                                            <tr>
                                                <td>{element.order.order_time.slice(0, 10)}</td>
                                                <td>
                                                    <Link className="order__name" to={"/kirja/" + element.book.id}>
                                                        {element.book.name}
                                                    </Link>
                                                </td>
                                                <td>{element.price.replace('.', ',')} €</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table> :
                            <p>Ei tehtyjä tilauksia.</p> :
                        <p>Kirjaudu sisään nähdäksesi tilaushistoriasi.</p>}
                </div>
            </div>
        </div >
    );
};

export default Profile;