const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  idDocumento: { type: String, required: true },
  nombre: { type: String, required: true },
  rol: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);