const express = require('express');
const router = express.Router();

// Task Model
const Producto = require('../models/producto');

// GET all Tasks
router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// GET all Tasks
router.get('/:id', async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res.json(producto);
});

// ADD a new task
router.post('/', async (req, res) => {
  const { idProducto, nombre, marca, unidades, valor } = req.body;
  const producto = new Producto({idProducto, nombre, marca, unidades, valor });
  await producto.save();
  res.json({status: 'Producto Saved'});
});

// UPDATE a new task
router.put('/:id', async (req, res) => {
  const { idProducto, nombre, marca, unidades, valor } = req.body;
  const newProducto = { idProducto, nombre, marca, unidades, valor };
  await Producto.findByIdAndUpdate(req.params.id, newProducto);
  res.json({status: 'Producto Updated'});
});

router.delete('/:id', async (req, res) => {
  await Producto.findByIdAndRemove(req.params.id);
  res.json({status: 'Producto Deleted'});
});

module.exports = router;