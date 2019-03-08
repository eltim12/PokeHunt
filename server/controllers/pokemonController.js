const axios = require('axios')
const pokemon = require('pokemon')

const poke = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

module.exports = {
    searchPokemon: function (req, res) {
        // console.log(req.query,'=======================')
        poke
            .get(`/pokemon/${req.query.name}`)
            .then(allData => {
                // console.log(req.params)
                res.status(200).json(allData.data)
                // console.log(allData)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({
                    msg: 'NOT FOUND'
                })
            })
    },

    random: function (req, res) {
        let randomName = pokemon.random()
        poke
            .get(`/pokemon/${randomName.toLowerCase()}`)
            .then(data => {
                res.status(200).json(data.data)
            })
            .catch(err => {
                console.log("ERROR!!!!!!!!!!")
                res.status(404).json({
                    msg: 'NOT FOUND'
                })
            })
    }
}