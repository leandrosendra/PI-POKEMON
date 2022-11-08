const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require('../db.js');
const {getAllPokemons, getTypes} = require('../helpers/index')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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


router.get('/types', async (req, res) => {
    try {
        let pokeTypes = await getTypes();
        res.status(200).send(pokeTypes)
    } catch (error) {
        console.log(`Error ${error} in get /types `);
        throw `Error ${error} in get /types `;
    }
})

module.exports = router;
