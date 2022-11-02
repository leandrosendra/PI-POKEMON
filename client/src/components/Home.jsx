import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterByType, filterCreated, filterByNameAndAttack } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado'
import SearchBar from './SearchBar';
import styles from '../stylesheets/Home.module.css'
import logo from '../images/logo.png'

const Home = () => {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    const types = useSelector(state => state.types)
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [orden, setOrden] = useState('')
    const indexOfLast = currentPage * pokemonsPerPage
    const indexOfFirst = indexOfLast - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirst, indexOfLast)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterByType(e) {
        dispatch(filterByType(e.target.value))
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterByName(e) {
        e.preventDefault();
        dispatch(filterByNameAndAttack(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={styles.container}>
            <Link to='/pokemon'></Link>
            <img height='100px' widht='100px' src={logo} alt='logo' />
            <div>
                    <SearchBar />
                <div  className={styles.inputContainer}>
                    <select className={styles.select} onChange={e => { handleFilterByName(e) }}>
                        <option value="asc">A - Z</option>
                        <option value="des">Z - A</option>
                        <option value="high">Highest Attack</option>
                        <option value="low">Lowest Attack</option>
                    </select>
                    <select className={styles.select} onChange={e => { handleFilterCreated(e) }}>
                        <option value="All">All</option>
                        <option value="Created">Created</option>
                        <option value="Api">Api</option>
                    </select>
                    <select className={styles.select} onChange={e => { handleFilterByType(e) }}>
                        <option value="All">All types</option>
                        {
                            types.map((t) => (
                                <option value={t.name} key={t.id}>{t.name}</option>
                            ))
                        }
                    </select>
                </div>
                <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />
                <Link to='/pokemon'>
                    <button className={styles.create}>Click here to create your own pokemon!</button>
                </Link>
                <div className={styles.cardContainer}>
                    {
                        currentPokemons?.map((p) => {
                            return (
                                <Fragment>
                                    <Card name={p.name} image={p.image ? p.image : 'aca va la imagen'} types={p.types} id={p.id} key={p.id} />
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;