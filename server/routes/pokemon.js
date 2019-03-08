const router = require('express').Router()
const pokemonController = require('../controllers/pokemonController')

router.get('/search', pokemonController.searchPokemon)
router.get('/random', pokemonController.random)

module.exports = router