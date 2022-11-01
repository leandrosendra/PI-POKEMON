import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../actions/index'

const PokemonCreate = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types)

    const [input, setInput] = useState({
        name: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        types: [],
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input));
        alert('Pokemon created succesfully');
        setInput({
            name: '',
            life: '',
            attack: '',
            defense: '',
            speed: '',
            weight: '',
            height: '',
            types: []
        })
        history.push('/home')
    }
             
            useEffect(() => {
                dispatch(getTypes());
            }, [dispatch]);

            return (
                <div>
                    <Link to='/home'><button>Volver</button></Link>
                    <h1>Crea tu pokemon</h1>
                    <form onSubmit={(e) => { handleSubmit(e) }}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={input.name}
                                name='name'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        <div>
                            <label>Life:</label>
                            <input
                                type="number"
                                value={input.life}
                                name='life'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        <div>
                            <label>Attack:</label>
                            <input
                                type="number"
                                value={input.attack}
                                name='attack'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        <div>
                            <label>Defense:</label>
                            <input
                                type="number"
                                value={input.defense}
                                name='defense'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        <div>
                            <label>Speed:</label>
                            <input
                                type="number"
                                value={input.speed}
                                name='speed'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        <div>
                            <label>Weight:</label>
                            <input
                                type="number"
                                value={input.weight}
                                name='weight'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        <div>
                            <label>Height:</label>
                            <input
                                type="number"
                                value={input.height}
                                name='height'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
                        {/* <div>
                    <label>Imagen:</label>
                    <input
                        type="text"
                        value={input.image}
                        name='image'
                        onChange={(e) => {handleChange(e)}}
                    />
                </div> */}
                        <select onChange={(e) => { handleSelect(e) }}>
                            {
                                types.map((t) => (
                                    <option value={t.name}>{t.name}</option>
                                ))
                            }
                        </select>
                        <ul><li>{input.types.map(t => t + ' ,')}</li></ul>
                        <button type='submit'>Crear Pokemon</button>
                    </form>
                </div>
            );
        };

        export default PokemonCreate;