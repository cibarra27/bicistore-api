const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
const productos = [
  { id: 1, nombre: 'Bicicleta Ruta Pro', precio: 1199990 },
  { id: 2, nombre: 'MTB Trail X', precio: 849990 },
  { id: 3, nombre: 'Casco Road Air', precio: 64990 },
  { id: 4, nombre: 'Kit Luces LED USB', precio: 24990 }
];
const pedidos = [];
app.get('/api/productos', (req, res) => { res.json(productos); });
app.get('/api/pedidos', (req, res) => { res.json(pedidos); });
app.post('/api/pedidos', (req, res) => {
  const { nombre, email, productoId } = req.body;
  if (!nombre || !email || !productoId) return res.status(400).json({ error:'Faltan datos obligatorios.'});
  const producto = productos.find(p=>p.id===productoId);
  if (!producto) return res.status(400).json({ error:'Producto no válido.'});
  const pedido={ id: pedidos.length+1, nombre, email, producto, fecha: new Date().toISOString()};
  pedidos.push(pedido);
  res.json({ mensaje:'Pedido registrado correctamente (demo, sin pago real).', pedido});
});
app.listen(PORT, ()=>console.log(`Backend escuchando en puerto ${PORT}`));