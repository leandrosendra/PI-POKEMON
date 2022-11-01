import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../actions'

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
        <div>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <input
                    type="text"
                    value = {name}
                    placeholder='Search...'
                    onChange={e => { handleInput(e) }}
                />
                <button type='submit'>SEARCH</button>
            </form>
        </div>
    );
};

export default SearchBar;