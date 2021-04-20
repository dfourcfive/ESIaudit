const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pool = require('./db')
const app = express()
const port = 3000


//midleware
app.use(cors());
app.use(express.json())

//routes

//
