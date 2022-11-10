import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail, cleanDetails } from '../actions/index.js'
import styles from '../stylesheets/Detail.module.css'

const Detail = (props) => {

    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.detail)

    useEffect(() => {
        const selectedId = props.match.params.id
        if(myPokemon.length === 0) {
            dispatch(getDetail(selectedId))
        } else {
            if (myPokemon[0].id !== selectedId) {
                dispatch(cleanDetails)
                dispatch(getDetail(selectedId));
            }
        }
    }, [dispatch, props.match.params.id]);

    return (
        <div className={styles.mainContainer}>
            <Link to='/home'><button className={styles.btn}>Go back</button></Link>
            {
                myPokemon.length > 0 ?
                    <div className={styles.container}>
                        <h1 className={styles.name}>{myPokemon[0].name}</h1>
                        <img className={styles.img} src={myPokemon[0].image} alt="" width='220px' height='220px' />
                        <h2 className={styles.stats}>Types: {myPokemon[0].types}</h2>
                        <h3 className={styles.stats}>Life: {myPokemon[0].life}</h3>
                        <h3 className={styles.stats}>Attack: {myPokemon[0].attack}</h3>
                        <h3 className={styles.stats}>Defense: {myPokemon[0].defense}</h3>
                        <h3 className={styles.stats}>Speed: {myPokemon[0].speed}</h3>
                        <h2 className={styles.stats}>Height: {myPokemon[0].height}</h2>
                        <h2 className={styles.stats}>Weight: {myPokemon[0].weight}</h2>
                    </div> : <p className={styles.loading}>Loading...</p>
            }
        </div>
    );
};

export default Detail;