import axios from 'axios';

export function getPokemons() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/types", {

        })
        return dispatch({
            type: "GET_TYPES",
            payload: json.data
        })
    }
}

export function getName(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons?name=' + payload);
            return dispatch({
                type: 'GET_NAME',
                payload: json.data
            })
        }
        catch (error) {
            console.log(error)
        }
    }

}

export function postPokemon(payload) {
    return async function(dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/pokemons", payload)
            return {
                type:"POST_POKEMON",
                payload: response
            }
        }
        catch(error) {
            console.log(error)
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
      try{
          var json = await axios.get("http://localhost:3001/pokemons/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
     
  } catch(error) {
    console.log(error)
  }
    }
  }

export function filterByType(payload) {
    return {
        type: 'FILTER_TYPE',
        payload: payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload: payload
    }
}

export function filterByNameAndAttack(payload) {
    return {
        type: 'FILTER_NAME',
        payload: payload
    }
}