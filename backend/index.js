const express = require("express")
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

const AuthRouter = require('./Routes/AuthRouter.js')
const productsRouter = require('./Routes/productsRouter.js')

require('dotenv').config();
require('./Modules/db');

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
    res.send('pong')
})

app.use(bodyParser.json())

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use('/auth', AuthRouter)
app.use('/products', productsRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})