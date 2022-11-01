import React from 'react';
import {useEffect} from  'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail } from '../actions/index.js'

const Detail = (props) => {

    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.detail)
    console.log(myPokemon)

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
      }, [dispatch]);    

    return (
        <div>
            {
                myPokemon.length > 0 ? 
                <div>
                    <h1>{myPokemon[0].name}</h1>
                    <img src={myPokemon[0].image} alt="" width='200px' height='300px'/>
                    <h2>Types: {myPokemon[0].types}</h2>
                    <div>Stats:
                        <h3>Life: {myPokemon[0].life}</h3>
                        <h3>Attack: {myPokemon[0].attack}</h3>
                        <h3>Defense: {myPokemon[0].defense}</h3>
                        <h3>Speed: {myPokemon[0].speed}</h3>
                    </div>
                    <h2>Height: {myPokemon[0].height}</h2>
                    <h2>Weight: {myPokemon[0].weight}</h2>
                </div> : <p>Loading...</p>
            }
            <Link to='/home'><button>volver</button></Link>
        </div>
    );
};

export default Detail;