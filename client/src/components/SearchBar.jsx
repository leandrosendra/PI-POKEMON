import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../actions'
import styles from '../stylesheets/Search.module.css'

const SearchBar = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== '') {
            dispatch(getName(name))
            setName("")
        }
    }

    return (
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <input
                 className={styles.container}
                    type="text"
                    value = {name}
                    placeholder='Search a pokemon here...'
                    onChange={e => { handleInput(e) }}
                />
                <button className={styles.btn} type='submit'>SEARCH</button>
                <button className={styles.btn}>Reload</button>
            </form>
    );
};

export default SearchBar;