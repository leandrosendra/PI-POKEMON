const initialState = {
    pokemons: [],
    detail: [],
    allPokemons: [],
    types: []
}




function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'GET_NAME':
            return {
                ...state,
                pokemons: action.payload
            }
        case "POST_POKEMON":
            return {
                ...state,
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'FILTER_TYPE':
            const allPokemons = state.allPokemons
            const typesFiltered = action.payload === 'All' ? allPokemons : allPokemons.filter(t => t.types.includes(action.payload))
            return {
                ...state,
                pokemons: typesFiltered
            }
        case 'FILTER_CREATED':
            const allPokemons2 = state.allPokemons;
            const pokeFiltered = action.payload === 'Created' ? allPokemons2.filter(p => p.createdInDb) : allPokemons2.filter(p => !p.createdInDb)
          return {
            ...state,
            pokemons:
              action.payload === "All" ? allPokemons2 : pokeFiltered
            }
        case 'FILTER_NAME':
            let sortedArray = [];
            if (action.payload === 'asc') {
                sortedArray = state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'des') {
                sortedArray = state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'high') {
                sortedArray = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'low') {
                sortedArray = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                pokemons: sortedArray
            }

        default:
            return state;
    }
}

export default rootReducer;