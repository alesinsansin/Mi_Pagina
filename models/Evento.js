const mongoose = require("mongoose");

const EventoSchema = new mongoose.Schema({
    cliente: String,
    tipoEvento: String,
    fecha: String,
    equipo: String,
    direccion: String,
    telefono: String,
    estado: String
});

module.exports = mongoose.model("Evento", EventoSchema);
