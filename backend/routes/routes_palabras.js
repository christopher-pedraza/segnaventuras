const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller_palabras.js')

// Rutas disponibles y las funciones que se llaman
router.get('/getAll', controller.getAll)
router.get('/get/:id', controller.get)
router.get('/getByCategoria/:id', controller.getPalabrasByCategoria)
router.post('/add', controller.add)
router.delete('/remove/:id', controller.remove)
router.put('/update/:id', controller.update)

module.exports = router