const express = require('express')
let router = express.Router()
const chirpstore = require('../../chirpstore')

// router.get('/', (req, res) => {
//     res.send('Chirps')
// })

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(chirpstore.GetChirp(id))
    } else {
        res.send(chirpstore.GetChirps())
    }
})

router.post('/', (req, res) => {
    chirpstore.CreateChirp(req.body)
    res.sendStatus(200)
})

router.put('/:id', (req, res) => {
    let id = req.params.id

    chirpstore.UpdateChirp(id, req.body)
    res.send("chirp " + id + " was updated")
})

router.delete('/:id', (req, res) => { // /api/chirps/sad
    let id = req.params.id

    res.json(chirpstore.DeleteChirp(id))
})

module.exports = router