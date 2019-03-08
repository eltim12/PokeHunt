const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const pokemonRoutes = require('./routes/pokemon')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
//for users 
app.use("/pokemon", pokemonRoutes)


app.listen(port, () => console.log("listening on port" + port))  
