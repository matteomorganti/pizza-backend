const Reserve = require('../Models/reserveModel');

// Prenota un tavolo
const reserveTable = async (req, res) => {
  const { name, selectedDay, selectedTime } = req.body;

  try {
    const reservation = await Reserve.create({ name, selectedDay, selectedTime });
    res.status(201).json({ reservation });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la prenotazione' });
  }
};

// Elimina una prenotazione
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reserve.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Prenotazione non trovata' });
    }
    res.status(200).json({ message: 'Prenotazione eliminata con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\' eliminazione della prenotazione' });
  }
};

// Visualizza tutte le prenotazioni
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reserve.find();
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero delle prenotazioni' });
  }
};

module.exports = { reserveTable, deleteReservation, getAllReservations };
