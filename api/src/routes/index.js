const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const db = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
      return results;
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


router.get('/pokemons', async (req, res, next) => {
    try {
        let name = req.query.name;
        let pokemonsTotal = await getAllPokemons();
        if (name) {
            let pokemonName = await pokemonsTotal.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send('This pokemon does not exist');
        } else {
            res.status(200).send(pokemonsTotal);
        }
    } catch (error) {
       next(error);
    }
})


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

router.get('/types', async (req, res) => {
    try {

        let pokeTypes = await getTypes();
        res.status(200).send(pokeTypes)
    } catch (error) {
        console.log(`Error ${error} in get /types `);
        throw `Error ${error} in get /types `;
    }
})


router.post('/pokemons', async (req, res) => {
    try {
        let { name, life, image, attack, defense, speed, height, weight, createdInDb, types } = req.body;
        const PokemonCreated = await Pokemon.create({
            name,
            life,
            image,
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDb
        })
        if (!name) return res.json({ info: "El nombre es obligatorio" });
        
        const pokemonTypes = await Type.findAll({
            where: { name: types }
        })
        PokemonCreated.addType(pokemonTypes);
        return res.send('Pokemon created successfuly')
    } catch (error) {
        res.status(400).send("Error en data");
    }
})


router.get('/pokemons/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const pokemonsTotal = await getAllPokemons();
        if (id) {
            let pokemonId = pokemonsTotal.filter((p) => p.id == id)
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(404).send('Pokemon not found')
        }
    } catch (error) {
        next(error);
    }
})
module.exports = router;
