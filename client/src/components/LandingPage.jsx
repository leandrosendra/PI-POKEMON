import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../stylesheets/Landing.module.css'
import pokemon from '../images/pokemon.png'

const LandingPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to the Pokemon App</h1>
            <img src={pokemon} width='300px' height='200px' alt="poke" />
            <Link to='/home'>
                <button className={styles.btn}>START</button>
            </Link>
        </div>
    );
};

export default LandingPage;