import React from 'react';
import './Footer.css';
import logo from '../../logo_valko2.png';

const Footer = () => {
    return (
        <div className="footer__container">

            <div className="footer__content">

                <div className="footer__logo">
                    <img src={logo} alt="AuraKirjat" />
                </div>

                <div className="footer__grid">
                    <div className="footer__info">
                        <h1>Ohjeet</h1>
                        <p>Tilaaminen</p>
                        <p>Varaa & Nouda</p>
                        <p>Tilaus ja Toimitusehdot</p>
                        <p>Usein Kysyttyä</p>
                        <p>Cookies / Evästeet</p>
                        <p>Tietosuojaseloste</p>
                    </div>

                    <div className="footer__info">
                        <h1>Asiakaspalvelu</h1>
                        <p>AuraKirjat</p>
                        <p>asiakaspalvelu@aurakirjat.fi</p>
                        <p>(02) 438 3510 arkisin 9-17</p>
                    </div>

                    <div className="footer__info">
                        <h1>Yrityksemme</h1>
                        <p>Yhteystiedot</p>
                        <p>Arvot</p>
                        <p>Avoimet työpaikat</p>
                    </div>

                    <div className="footer__info">
                        <h1>Seuraa meitä</h1>
                        <div className="footer__some">
                            <i className="fa fa-facebook-official"></i>
                            <p className="footer__some__name">Facebook</p>
                        </div>
                        <div className="footer__some">
                            <i className="fa fa-instagram"></i>
                            <p className="footer__some__name">Instagram</p>
                        </div>
                        <div className="footer__some">
                            <i className="fa fa-linkedin-square"></i>
                            <p className="footer__some__name">LinkedIn</p>
                        </div>
                        <div className="footer__some">
                            <i className="fa fa-twitter-square"></i>
                            <p className="footer__some__name">Twitter</p>
                        </div>
                    </div>
                </div>

                <div className="footer__copyright">
                    <p>&copy; AuraKirjat 2020</p>
                </div>
            </div>
        </div >
    )
}

export default Footer;