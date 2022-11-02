import React from 'react';
import styles from '../stylesheets/Pagination.module.css'

const Paginado = ({pokemonsPerPage, allPokemons, paginado}) => {
    const pageNumbers = [];
    for (let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return (
        <div className={styles.container}>
            <ul className={styles.pagination}>
                {
                    pageNumbers && pageNumbers.map((n) => (
                        <li className={styles.item} key={n}>
                            <div onClick={() => paginado(n)}>{n}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Paginado;