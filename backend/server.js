const express = require('express')
const app = express()
var fs = require('fs');
const csv = require('csv-parser')
var cors = require('cors')

const port = 3000
let pokemons = [];
let abilities = [];
let pokemon_abilities = [];



fs.createReadStream('./data/pokemon.csv')
    .pipe(csv())
    .on('data', (data) => pokemons.push(data))
    .on('end', () => {
    });
fs.createReadStream('./data/ability_names.csv')
    .pipe(csv())
    .on('data', (data) => abilities.push(data))
    .on('end', () => {
    });

fs.createReadStream('./data/pokemon_abilities.csv')
    .pipe(csv())
    .on('data', (data) => pokemon_abilities.push(data))
    .on('end', () => {
    });


app.use(cors())
app.get('/api/v1/pokemons', async (req, res) => {
    return res.status(200).json(pokemons)
})
app.get('/api/v1/abilities', async (req, res) => {
    return res.status(200).json(abilities)
})
app.get('/api/v1/pokemon-abilities', async (req, res) => {
    return res.status(200).json(pokemon_abilities)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})