const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const db = require('../db.js');

const getApiInfo = async () => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
        const data = Promise.all(
            response.data.results.map(async (p) => {
                let secondResponse = await axios.get(p.url);
                let pokemonResponse = {
                    id: secondResponse.data.id,
                    name: secondResponse.data.name,
                    life: secondResponse.data.stats[0].base_stat,
                    attack: secondResponse.data.stats[1].base_stat,
                    defense: secondResponse.data.stats[2].base_stat,
                    speed: secondResponse.data.stats[5].base_stat,
                    height: secondResponse.data.height,
                    weight: secondResponse.data.weight,
                    types: secondResponse.data.types.map((t) => t.type.name),
                    image: secondResponse.data.sprites.other['official-artwork'].front_default,
                }
                return pokemonResponse;
            })
        )
        return data;
    } catch (error) {
        console.log(`Error ${error} in getApiInfo `);
        throw `Error ${error} in getApiInfo `;
    }
};

const getDbInfo = async () => {
    try{
      const results = await Pokemon.findAll({ //TRAERME TODO LO DE LA TABLA POKEMON, INCLUIDA LA RELACION CON TYPE
          include:{
              model: Type,
              attributes: ['name'],
              through:{
                  attributes: [],
              }
          }
      })
      
      const formatedResults = results.map((p) => ({
        ...p.dataValues,
        types: p.dataValues.types.map((t)=> t.name)
      }))
      return formatedResults;
  }catch (err){
      console.log(err);
  }
} 

const getAllPokemons = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dBInfo = await getDbInfo();
        const totalInfo = apiInfo.concat(dBInfo)
        return totalInfo;
    } catch (error) {
        console.log(`Error ${error} in getAllPokemons `);
        throw `Error ${error} in getAllPokemons `;
    }
}

const getTypes = async () => {
    try {
        let typesDb = await Type.findAll();
        if (typesDb.length > 0) {
            return typesDb;
        } else {
            const response = await axios.get('https://pokeapi.co/api/v2/type');
            const data = Promise.all(
                response.data.results.map(async (p) => {
                    let types = await Type.findOrCreate({
                        where: { name: p.name }
                    })
                    return types;
                })
            )
            return data;
        }
    } catch (error) {
        console.log(`Error ${error} in getTypes `);
        throw `Error ${error} in getTypes `;
    }
}

module.exports = {getApiInfo, getDbInfo, getAllPokemons, getTypes};
