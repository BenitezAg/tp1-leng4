// Función para obtener la ubicación usando la API del navegador
function obtenerUbicacionActual() {
  // Verificamos si el navegador soporta la geolocalización
  if (navigator.geolocation) {
    
    // Llamamos al método getCurrentPosition
    navigator.geolocation.getCurrentPosition(
      // 1. Función de éxito (se ejecuta si el usuario da permiso)
      function(posicion) {
        // Extraemos las coordenadas y las colocamos en los inputs
        document.getElementById("lat").value = posicion.coords.latitude;
        document.getElementById("lng").value = posicion.coords.longitude;
        document.getElementById("nombre").value = "Mi Ubicación Actual";
      },
      // 2. Función de error (se ejecuta si falla o se deniega el permiso)
      function(error) {
        alert("Error al obtener la ubicación: " + error.message);
      }
    );
 // La alerta es porque, segun la teoria proporcionada si leemos, se menciona que
 // no todo navegador soporta esta API por lo tanto ahi esta 
  } else {
    alert("Tu navegador no soporta la API de Geolocalización.");
  }
}

function abrirUbicacion() {
  // Obtenemos los valores y quitamos espacios en blanco al inicio y al final
  let lat = document.getElementById("lat").value.replace(",", ".").trim();
  let lng = document.getElementById("lng").value.replace(",", ".").trim();
  let nombre = document.getElementById("nombre").value.trim();

  let queryBusqueda = "";

  // 1. Si el usuario ingresó Latitud y Longitud, buscamos por coordenadas
  if (lat !== "" && lng !== "") {
    queryBusqueda = `${lat},${lng}`;
  } 
  // 2. Si NO hay coordenadas, pero el usuario ingresó un Nombre, buscamos por el nombre
  else if (nombre !== "") {
   
    queryBusqueda = encodeURIComponent(nombre);
  } 
  // 3. Si todo está vacío, mostramos una alerta
  else {
    alert("Por favor, ingrese un Nombre de Ubicación o las coordenadas (Latitud y Longitud).");
    return; // Detenemos la ejecución de la función
  }

  // Cargamos el mapa con la consulta (query) resultante
  document.getElementById("map").innerHTML =
    `<iframe src="https://maps.google.com/maps?q=${queryBusqueda}&z=15&output=embed"
      width="100%" height="300" style="border:0"></iframe>`;
}