const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
  idProducto: { type: String, required: true },
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  unidades: { type: String, required: true },
  valor: { type: String, required: true },
});

module.exports = mongoose.model('Producto', ProductoSchema);