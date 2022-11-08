import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../actions/index'
import styles from '../stylesheets/Create.module.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required'
    }
    if (input.name.length > 20) {
        errors.name = 'The name cant be longer than 20 characters'
    }
    if (input.life < 1 || input.life > 150) {
        if (input.life < 1) {
            errors.life = 'The life of the Pokemon must be higher than 1'
        }
        if (input.life > 150) {
            errors.life = 'The life of the Pokemon must be less than 150'
        }
    }
    if(input.attack < 1 || input.attack > 200) {
        if(input.attack < 1) {
            errors.attack = 'The attack of the Pokemon must be higher than 1'
        }
        if (input.attack > 200) {
            errors.attack = 'The attack of the Pokemon must be less than 200'
        }
    }
    if(input.defense < 1 || input.defense > 200) {
        if(input.defense < 1) {
            errors.defense = 'The defense of the Pokemon must be higher than 1'
        }
        if (input.defense > 200) {
            errors.defense = 'The defense of the Pokemon must be less than 200'
        }
    }
    if(input.speed < 1 || input.speed > 100) {
        if(input.speed < 1) {
            errors.speed = 'The speed of the Pokemon must be higher than 1'
        }
        if (input.speed > 100) {
            errors.speed = 'The speed of the Pokemon must be less than 100'
        }
    }
    if(input.weight < 1 || input.weight > 2000) {
        if(input.weight < 1) {
            errors.weight = 'The weight of the Pokemon must be higher than 1'
        }
        if (input.weight > 2000) {
            errors.weight = 'The weight of the Pokemon must be less than 2000'
        }
    }
    if(input.height < 1 || input.height > 100) {
        if(input.height < 1) {
            errors.height = 'The height of the Pokemon must be higher than 1'
        }
        if (input.height > 100) {
            errors.height = 'The height of the Pokemon must be less than 100'
        }
    }
    if(!input.types.length){
        errors.types = 'Must choose a pokemon type'
    }
    if(input.types.length > 2){
        errors.types = `You can't choose more than 2 types per Pokemon`
    }    
    return errors;
}

const PokemonCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});
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
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        if (input.types.length < 2) { setInput({
            ...input,
            types: [...input.types, e.target.value]
        }) }
        
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
        <div className={styles.container}>
            <Link to='/home'><button className={styles.btn}>Go back</button></Link>
            <h1 className={styles.name}>Create your own pokemon</h1>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <div>
                    <label className={styles.nameStats}>Name:</label>
                    <input
                        className={styles.inputs}
                        type="text"
                        value={input.name}
                        name='name'
                        onChange={(e) => { handleChange(e) }}
                    />
                    {errors.name && (
                        <p className={styles.errors}>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className={styles.nameStats}>Life:</label>
                    <input
                        className={styles.inputs}
                        type="number"
                        value={input.life}
                        name='life'
                        onChange={(e) => { handleChange(e) }}
                    />
                    {errors.name && (
                        <p className={styles.errors}>{errors.life}</p>
                    )}
                </div>
                <div>
                    <label className={styles.nameStats}>Attack:</label>
                    <input
                        className={styles.inputs}
                        type="number"
                        value={input.attack}
                        name='attack'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.name && (
                        <p className={styles.errors}>{errors.attack}</p>
                    )}
                </div>
                <div>
                    <label className={styles.nameStats}>Defense:</label>
                    <input
                        className={styles.inputs}
                        type="number"
                        value={input.defense}
                        name='defense'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.name && (
                        <p className={styles.errors}>{errors.defense}</p>
                    )}
                </div>
                <div>
                    <label className={styles.nameStats}>Speed:</label>
                    <input
                        className={styles.inputs}
                        type="number"
                        value={input.speed}
                        name='speed'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.name && (
                        <p className={styles.errors}>{errors.speed}</p>
                    )}
                </div>
                <div>
                    <label className={styles.nameStats}>Weight:</label>
                    <input
                        className={styles.inputs}
                        type="number"
                        value={input.weight}
                        name='weight'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.name && (
                        <p className={styles.errors}>{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label className={styles.nameStats}>Height:</label>
                    <input
                        className={styles.inputs}
                        type="number"
                        value={input.height}
                        name='height'
                        onChange={(e) => { handleChange(e) }}
                    />
                     {errors.name && (
                        <p className={styles.errors}>{errors.height}</p>
                    )}
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
                <div className={styles.nameStats}>Type/s</div>
                <select className={styles.inputs} onChange={(e) => { handleSelect(e) }}>
                    {
                        types.map((t) => (
                            <option value={t.name}>{t.name}</option>
                        ))
                    }
                </select>
                <ul><li>{input.types.map(t => t + ' ,')}</li></ul>
                {errors.name && (
                        <p className={styles.errors}>{errors.types}</p>
                    )}
                <button className={styles.btn} type='submit'>Crear Pokemon</button>
            </form>
        </div>
    );
};

export default PokemonCreate;