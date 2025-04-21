const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

// Simulación de mesas
let mesas = [
  { id: 1, nombre: "Mesa 1" },
  { id: 2, nombre: "Mesa 2" },
  { id: 3, nombre: "Mesa 3" }
];

// Simulación de pedidos (órdenes)
let ordenes = [];

// 🔹 Obtener todas las órdenes
app.get("/api/ordenes", (req, res) => {
  res.json(ordenes);
});

// 🔹 Crear un pedido nuevo
app.post("/api/ordenes", (req, res) => {
  const { mesaId, productos, metodoPago, cliente, total } = req.body;

  const mesa = mesas.find(m => m.id === mesaId);
  if (!mesa) {
    return res.status(404).json({ error: "Mesa no encontrada" });
  }

  const nuevaOrden = {
    id: ordenes.length + 1,
    cliente,
    mesa: mesa.nombre,
    productos,
    total,
    metodoPago,
    estado: "pendiente"
  };

  ordenes.push(nuevaOrden);
  res.status(201).json({ message: "Orden creada con éxito", orden: nuevaOrden });
});

// 🔹 Marcar una orden como entregada
app.patch("/api/ordenes/:id", (req, res) => {
  const idOrden = parseInt(req.params.id);
  const orden = ordenes.find(o => o.id === idOrden);

  if (!orden) {
    return res.status(404).json({ error: "Orden no encontrada" });
  }

  orden.estado = "entregado";
  res.json({ message: "Orden marcada como entregada", orden });
});

// 🔹 Obtener mesas
app.get("/api/mesas", (req, res) => {
  res.json(mesas);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
