// Inicialización del mapa en Santiago, Chile (Región Metropolitana)
const map = L.map('map').setView([-33.4489, -70.6693], 12); // Coordenadas de Santiago

// Añadimos el tile layer de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Evento click en el mapa
let marcador;
map.on('click', function (e) {
    if (marcador) {
        map.removeLayer(marcador);
    }
    // Añade un marcador en el lugar donde el usuario hace click
    marcador = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    
    // Almacena las coordenadas en inputs ocultos si es necesario
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lng').value = e.latlng.lng;
});

// Enviar datos al servidor
document.getElementById('proyectoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtiene el nombre del proyecto y las coordenadas del marcador
    const nombreProyecto = document.getElementById('nombreProyecto').value;
    if (!marcador) {
        alert('Por favor selecciona una ubicación en el mapa.');
        return;
    }
    const { lat, lng } = marcador.getLatLng();
    
    // Enviar los datos al servidor utilizando fetch
    const response = await fetch('/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreProyecto, lat, lng }),
    });

    if (response.ok) {
        alert('Proyecto guardado correctamente');
    } else {
        alert('Error al guardar el proyecto');
    }
});

console.log('Mapa cargado correctamente');