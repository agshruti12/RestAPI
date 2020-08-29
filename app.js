//load our app server using express

const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')




app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./form'))

app.use(morgan('short'))

const router = require('./routes/club.js')

app.use(router)


//localhost:3003
app.listen(3003, function(){
    console.log("server running")
  })