//all the get and post requests
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool ({
    connectionLimit: 10,
    host: '192.168.1.206',
    user: 'root',
    password: '1234',
    database: 'brhsclub'
})

function getConnection() {
    return pool
}

//GET REQUESTS
//get all clubs
router.get('/allclubs', (req, res) => {
    //console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const queryString = "SELECT * FROM club "

    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query clubs: " + err)
            res.sendStatus(500)
            return
        }

        console.log("I think we fetched clubs successfully..PLEASE")
        res.json(rows)

    })

    //res.end()
})

//get root response
router.get("/", (req, res) => {
    
    console.log("responding to rooot")
    res.send("hello from roooott")
    
})

//get club from its id
router.get('/club/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const queryString = "SELECT * FROM club WHERE CLUB_ID = ?"
    const clubId = req.params.id

    connection.query(queryString, [clubId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query clubs: " + err)
            res.sendStatus(500)
            return
        }

        res.json(rows)

    })

    //res.end()
})

//create club from form.html
router.post('/club_create', (req, res) => {
    console.log("trying to create a new club")

    const clubName = req.body.new_name
    const clubId = req.body.new_ID

    const queryString = "INSERT INTO club (CLUB_ID, CLUB_NAME) VALUES (?, ?)"
    getConnection().query(queryString, [clubId, clubName], (err, results, fields) => {
        if (err){
            console.log("failed to create club:" + err)
            res.sendStatus(500)
            return
        }

        //console.log("inserted new club with id: " + results.insertId)
        res.redirect('/allclubs')
    })
    
})




module.exports = router