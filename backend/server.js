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
    const page = req.query['page']
    // need ot be validate
    const filter = req.query['filter']
    // Pengurutan Data (Sorting) : Data Pokémon harus ditampilkan dengan urutan berdasarkan bobot terberat ke yang paling ringan (Weight Descending).


    pokemons = pokemons.sort((a, b) => {
        if(parseInt(a.weight) < parseInt(b.weight)) {
            return 1
        } else if (parseInt(b.weight) < parseInt(a.weight)) {
            return -1
        }
        return 0
    })

    
    // Fitur Filtering (Dropdown) : Wajib menyediakan fitur filter berdasarkan rentang berat (weight) dengan kategori sebagai berikut:
    // Light: Rentang berat 100 - 150
    // Medium: Rentang berat 151 - 199
    // Heavy: Rentang berat di atas atau sama dengan 200
    // ALL: Menampilkan semua berat
    const weightFilter = () => {
        switch (filter) {
            case "light":
                pokemons = pokemons.filter(it => parseInt(it.weight) > 100 && parseInt(it.weight) <= 150)
                break;
            case "medium":
                pokemons = pokemons.filter(it => parseInt(it.weight) > 150 && parseInt(it.weight) < 200)
            case "heavy":
                pokemons = pokemons.filter(it => parseInt(it.weight) >= 200)

            default:
                break;
        }
    }

    if(filter) {
        weightFilter()
    }


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