const express = require('express');
const router = express.Router();
const reserveController = require('../Controllers/reserveController');

// Prenota un tavolo
router.post('/', reserveController.reserveTable);

// Visualizza tutte le prenotazioni
router.get('/reservations', reserveController.getAllReservations);

// Elimina una prenotazione
router.delete('/:id', reserveController.deleteReservation);

module.exports = router;
