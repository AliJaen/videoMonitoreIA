import requests
import time
import random

# URL del endpoint en el servidor Node.js
url = "http://localhost:3000/api/detections"

# Variables de estado para cada cámara
camera_states = {
    1: {"active": False, "timeout": 0},
    2: {"active": False, "timeout": 0},
    3: {"active": False, "timeout": 0},
    4: {"active": False, "timeout": 0},
}

# Función para generar coordenadas aleatorias
def generate_random_coordinates(camera_id):
    data = {
        "type": "vehiculo" if random.random() > 0.5 else "persona",
        "camera_id": camera_id,
        "coordinates": {
            "x": random.randint(0, 640),
            "y": random.randint(0, 480),
            "width": random.randint(50, 100),
            "height": random.randint(50, 100)
        }
    }
    return data

while True:
    for camera_id, state in camera_states.items():
        # Activar detección con una probabilidad del 30% si no está activa
        if not state["active"] and random.random() < 0.3:
            state["active"] = True
            state["timeout"] = random.randint(5, 15) # Tiempo de detección activo en segundos
        
        # Si la detección está activa, enviar datos
        if state["active"]:
            detection_data = generate_random_coordinates(camera_id)
            response = requests.post(url, json=detection_data)

            if response.status_code == 200:
                print(f"Detección enviada desde cámara {'camera_id'}: {detection_data}")
            else:
                print(f"Error al enviar la detección para la cámara {camera_id}: {response.status_code}")

            # Reducr el tiempo restante de detección
            state["timeout"] -= 1
            # Desactivar detección si el tiempo llegó a 0
            if state["timeout"] <= 0:
                state["active"] = False

    time.sleep(0.5) # Envía datos constatntes cada 0.5 segundos
