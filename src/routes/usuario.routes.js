const express = require('express');
const router = express.Router();

// Task Model
const Usuario = require('../models/usuario');

// GET all Tasks
router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// GET all Tasks
router.get('/:id', async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
});

// ADD a new task
router.post('/', async (req, res) => {
  const {idDocumento, nombre, rol, correo, telefono } = req.body;
  const usuario = new Usuario({idDocumento, nombre, rol, correo, telefono });
  await usuario.save();
  res.json({status: 'Usuario Saved'});
});

// UPDATE a new task
router.put('/:id', async (req, res) => {
  const {idDocumento, nombre, rol, correo, telefono } = req.body;
  const newUsuario = {idDocumento, nombre, rol, correo, telefono };
  await Usuario.findByIdAndUpdate(req.params.id, newUsuario);
  res.json({status: 'Usuario Updated'});
});

router.delete('/:id', async (req, res) => {
  await Usuario.findByIdAndRemove(req.params.id);
  res.json({status: 'Producto Deleted'});
});

module.exports = router;