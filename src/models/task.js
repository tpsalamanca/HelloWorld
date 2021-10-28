const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  idVenta: { type: String, required: true },
  documento: { type: String, required: true },
  nombre: { type: String, required: true },
  producto: { type: String, required: true },
  valor: { type: String, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
