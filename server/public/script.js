const host = "localhost";
const port = 3000;
const socket = new WebSocket(`ws://${host}:${port}`);

socket.onopen = () => {
  console.log("Conectado al WebSocket");
};

// Función para dibujar detecciones en la cámara correspondiente
function drawDetection(cameraID, coordinates) {
  const cameraElement = document.getElementById(`camera-${cameraID}`);
  if (cameraElement) {
    // Eliminar detecciones anteriores
    cameraElement.querySelectorAll(".detection").forEach((det) => det.remove());

    // Dimensiones del contenedor de la cámara
    const containerWidth = cameraElement.offsetWidth;
    const containerHeight = cameraElement.offsetHeight;

    // Escalar las coordenadas
    const scaleX = containerWidth / 640; // Adaptar a las coordenadas de la cámara
    const scaleY = containerHeight / 480; // Adaptar a las coordenadas de la cámara

    // Crear un nuevo elemento de detección
    const detectionElement = document.createElement("div");
    detectionElement.classList.add("detection");
    detectionElement.style.left = `${coordinates.x * scaleX}px`;
    detectionElement.style.top = `${coordinates.y * scaleY}px`;
    detectionElement.style.width = `${coordinates.width * scaleX}px`;
    detectionElement.style.height = `${coordinates.height * scaleY}px`;

    cameraElement.appendChild(detectionElement);
  }
}

socket.onmessage = (event) => {
  const detection = JSON.parse(event.data);
  console.log("Detección recibida:", detection);

  // Dibujar la detección en la cámara correspondiente
  drawDetection(detection.camera_id, detection.coordinates);
};

socket.onclose = () => {
  console.log("Conexión cerrada con el WebSocket");
};
