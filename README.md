# Sistema de Monitoreo de Cámaras con IA (simulación IA)

Este proyecto es el frontedn para mostrar Video por IP con renderización de detecciones con IA

## Características

- **Servidor WebSocket en Node.js**: Proporciona un canal de comunicación en tiempo real entre el servidor y los clientes.
- **Simulación de Coordenadas con Python**: Un script de Python genera coordenadas simuladas para cuatro cámaras.
- **Interfaz de Usuario HTML**: Permite visualizar en tiempo real las coordenadas simuladas mediante rectángulos superpuestos en el área de visualización de cada cámara.

## Estructura del Proyecto

```
/project-root
├── server               # Carpeta para el servidor Node.js y WebSocket
│   ├── node_modules/    # Módulos de Node.js
│   ├── public/          # Archivos de frontend
│   │   ├── index.html   # Pantalla que muestra las cámaras
│   │   ├── styles.css   # Estilos de la página
│   │   ├── script.js    # Lógica de frontend y conexión a WebSocket
│   │   ├── spinner.html # Fragmento HTML (Para mostrar en pantalla completa a futuro por cámara)
│   │   ├── spinner.css  # Estilos del loader
│   │   └── spinner.js   # Lógica para mostrar el loader
│   ├── server.js        # Servidor HTTP y WebSocket en Node.js
│   └── package.json     # Configuración de dependencias de Node.js
│
└── python-simulator     # Carpeta para el script de simulación en Python
    └── simulate.py      # Script de Python para simular detecciones y enviar coordenadas
```

## Requisitos

- **Node.js** (versión 14 o superior)
- **Python** (versión 3.7 o superior)
- **Biblioteca WebSockets de Python**: Instalable mediante `pip install websockets`

## Instalación

1. **Clona el repositorio** y navega al directorio del proyecto:

   ```bash
   git clone https://github.com/tu_usuario/tu_proyecto.git
   cd tu_proyecto
   ```

2. **Instala las dependencias de Node.js**:

   ```bash
   npm install
   ```

3. **Instala la biblioteca WebSockets para Python**:

   ```bash
   pip install websockets
   ```

4. **Visualizar en el Navegador**
   Abre el navegador y visita http://localhost:3000. Verás cuatro rectángulos representando el área de visión de cada cámara. A medida que se reciben coordenadas simuladas, se dibujarán rectángulos sobre cada área, representando los objetos detectados.

## Estructura y Funcionamiento

### Servidor WebSocket (server.js)

    - Sirve archivos estáticos (HTML, CSS, JS) mediante Express.
    - Mantiene el canal WebSocket abierto para la comunicación en tiempo real entre los clientes y el simulador en Python.
    - Gestiona conexiones de múltiples clientes y transmite los datos de coordenadas a todos los clientes conectados.

### Simulador de Coordenadas en Python (simulator.py)

    - Envía coordenadas simuladas en tiempo real a través del WebSocket.
    - Genera posiciones aleatorias para cuatro cámaras en un área simulada de 640x480 píxeles.
    - Envía actualizaciones cada segundo para simular movimiento y cambios de posición.

### Cliente HTML

    - Conecta al servidor WebSocket y recibe datos de coordenadas en tiempo real.
    - Actualiza la interfaz visualizando rectángulos en áreas específicas según las coordenadas recibidas, representando las detecciones para cada cámara.

## Ejemplo de Configuración

La configuración para el servidor de Node.js y el simulador de Python se encuentran en los archivos `server.js` y `simulator.py`, respectivamente. Ambos deben estar configurados para conectarse a `ws://localhost:3000` por defecto.

## Posibles Mejoras

    - Integración de una IA real para reemplazar el simulador de Python y detectar personas y vehículos en tiempo real.
    - Configuración para gestionar más cámaras.
    - Interfaz de usuario avanzada para visualizar múltiples vistas y alertas de detección.

## Notas

Este software es una simulación inicial para un sistema de monitoreo con cámaras y detección de objetos. Está diseñado para pruebas locales y sirve como base para futuras integraciones de IA y despliegue en producción.
