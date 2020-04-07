let personas = [{
    "nombre": "Occonnor",
    "sexo": "M",
    "avatar": "img/avatar1.png"
  },
  {
    "nombre": "Pepa",
    "sexo": "M",
    "avatar": "img/avatar2.png"
  },
  {
    "nombre": "JoseMari",
    "sexo": "H",
    "avatar": "img/avatar3.png"
  },
  {
    "nombre": "JuanCarlos",
    "sexo": "H",
    "avatar": "img/avatar4.png"
  },
  {
    "nombre": "Monica",
    "sexo": "M",
    "avatar": "img/avatar5.png"
  },
  {
    "nombre": "Alberto",
    "sexo": "H",
    "avatar": "img/avatar6.png"
  },
  {
    "nombre": "Rafael",
    "sexo": "H",
    "avatar": "img/avatar7.png"
  }
]

window.addEventListener('load', init());

function init() {

  console.debug('Document Load and Ready');

  const url = "http://localhost:8080/apprest/api/personas/";
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      console.info('peticion GET ' + url);
      console.debug(this.responseText);

      // parsear texto a Json
      const jsonData = JSON.parse(this.responseText);
      console.debug(jsonData);

      let idSelect = document.getElementById('idSelect');
      idSelect.addEventListener('change', function(){
        const valor = this.value;
        console.debug('Seleccionamos las personas con sexo: ' + valor)
        if (valor != 'T') {
          const peronasFiltradas = jsonData.filter(el => el.sexo == valor);
          pintarListado(peronasFiltradas);
        } else {
          pintarListado(jsonData);
        }
      });
      
      
      let inputNombre = document.getElementById('nombreInput');
      inputNombre.addEventListener('keyup', function(){
        const busqueda = this.value.toLowerCase();
        console.debug('tecla pulsada, valor input ' + busqueda);
        if (busqueda) {
          const personasFiltradas = jsonData.filter(el => el.nombre.toLowerCase().includes(busqueda));
          pintarListado(personasFiltradas);
        } else {
          pintarListado(jsonData);
        }
      });
      pintarListado(jsonData);
      
    } // his.readyState == 4 && this.status == 200
  }; // onreadystatechange
  xhttp.open("GET", url, true);
  xhttp.send();

}

function seleccionarPersonas() {


}

function nombrePersonas() {

}

function pintarListado(arrayPersonas) {
  let listado = document.getElementById('alumnos');
  listado.innerHTML = '';

  arrayPersonas.forEach(el => listado.innerHTML += `<li class="border border-dark p-1"> <img src=${el.avatar} class="border border-danger rounded-circle"> ${el.nombre}</li> `);
  console.debug(arrayPersonas);
}