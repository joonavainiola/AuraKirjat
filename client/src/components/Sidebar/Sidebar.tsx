import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface ISidebar {
    toggleMenu: boolean,
    setToggleMenu: (value: boolean) => void
}

const Sidebar: React.FC<ISidebar> = (props) => {

    const { toggleMenu, setToggleMenu } = props;
    const closeSidebar = () => setToggleMenu(!toggleMenu);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
    });

    return (
        <div
            className={"sidebar__container " + (toggleMenu ? "show-sidebar" : "")}
        >
            <div className="sidebar__content show-desktop">
                <div className="exit-button" onClick={closeSidebar}>
                    <i className="fa fa-times"></i>
                </div>
                <Link
                    to="/genret/kaunokirjallisuus"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Kaunokirjallisuus
                </Link>
                <Link
                    to="/genret/nuortenkirjat"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Nuortenkirjat
                </Link>
                <Link
                    to="/genret/lastenkirjat"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Lastenkirjat
                </Link>
                <Link
                    to="/genret/historia"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Historia
                </Link>
                <Link
                    to="/genret/luonnontieteet"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Luonnontieteet
                </Link>
                <Link
                    to="/genret/ohjelmointi"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Ohjelmointi
                </Link>
                <Link
                    to="/genret/elämäkerrat"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Elämäkerrat
                </Link>
                <Link
                    to="/genret/ruoanlaitto"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Ruoanlaitto
                </Link>
                <Link
                    to="/genret/runous"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Runous
                </Link>
                <Link
                    to="/genret/kieltenopiskelu"
                    className="sidebar__link"
                    onClick={windowWidth < 751 ? closeSidebar : undefined}
                >
                    Kieltenopiskelu
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;