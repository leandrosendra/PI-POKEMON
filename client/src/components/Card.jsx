import React from 'react';
import { Link } from 'react-router-dom'
import styles from '../stylesheets/Card.module.css'

const Card = ({ name, image, types, id }) => {

    const formatedTypes = types?.join(', ');

    return (
        <div className={styles.container}>
            <img className={styles.img} src={image} alt="" width='200px' height='200px' />
            <div className={styles.nameContainer}>
                <h3 className={styles.name}>{name}</h3>
                <h5 className={styles.types}>Type: {formatedTypes}</h5>
                <Link to={'/home/' + id}>
                <button className={styles.btn}>Know more about this pokemon!</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;