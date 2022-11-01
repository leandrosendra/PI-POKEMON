import React from 'react';

const Paginado = ({pokemonsPerPage, allPokemons, paginado}) => {
    const pageNumbers = [];
    for (let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return (
        <div>
            <ul>
                {
                    pageNumbers && pageNumbers.map((n) => (
                        <li key={n}>
                            <div onClick={() => paginado(n)}>{n}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Paginado;