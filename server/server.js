const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const host = "localhost";
const port = 3000;

// Servidor HTTP y WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta para servir la página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});

// ALmacenar las conexiones activas
let clients = [];

// Al establecer la conexión con un cliente
wss.on("connection", (ws) => {
  console.log("Cliente conectado");
  clients.push(ws);

  // Manejar la desconexión del cliente
  ws.on("close", () => {
    clients.filter((client) => client !== ws);
    console.log("Cliente desconectado");
  });
});

// Función para evitar detecciones a todos los clientes conectados
function sendDetectionToClientes(detectionData) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(detectionData));
    }
  });
}

// Endpoint para recibir detecciones desde Python
app.post("/api/detections", express.json(), (req, res) => {
  const detectionData = req.body;
  console.log("Detección recibida:", detectionData);

  // Enviar detección a todos los clientes conectados
  sendDetectionToClientes(detectionData);

  res.status(200).send("Detección procesada");
});
