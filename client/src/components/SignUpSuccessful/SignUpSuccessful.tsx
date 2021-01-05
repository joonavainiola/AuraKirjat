import React from 'react';
import './SignUpSuccessful.css';

const SignUpSuccessful = () => {
    return (
        <div className="container">
            <div className="signupsuccess__content">
                <div>
                    <i className="fa fa-check"></i>
                    <h2>Rekisteröityminen onnistui!</h2>
                </div>

                <p>Ole hyvä ja kirjaudu sisään.</p>
            </div>
        </div>
    )
};

export default SignUpSuccessful;