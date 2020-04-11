"use strict";


$(function () {
$('[data-toggle="tooltip"]').tooltip()
})


// este array se carga de forma asincrona mediante Ajax
const url = "http://127.0.0.1:5500/appclient/js/data/personas.json";

//const url = "http://localhost:8080/apprest/api/personas/";
let personas = [
  /* {
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
  } */
]

window.addEventListener('load', init());

function init() {
  console.debug('Document Load and Ready');
  listener();

  const promesa = ajax("GET", url, undefined);
  promesa.then(data => {
      console.trace('promesa resolve');
      personas = data;
      pintarListado(personas);
    })
    .catch(error => {
      console.warn('promesa rejectada');
      alert(error);
    });

  console.debug('continua la ejecuion del script de forma sincrona');
  // CUIDADO!!!, es asincrono aqui personas estaria sin datos
  // pintarLista( personas );

} //init

function listener() {
  let idSelect = document.getElementById('idSelect');
  idSelect.addEventListener('change', seleccionarSexo);

  function seleccionarSexo() {
    const valor = this.value;
    console.debug('Seleccionamos las personas con sexo: ' + valor)
    if (valor != 't') {
      const peronasFiltradas = personas.filter(el => el.sexo == valor);
      pintarListado(peronasFiltradas);
    } else {
      pintarListado(personas);
    }
  };


  let inputNombre = document.getElementById('nombreInput');
  inputNombre.addEventListener('keyup', nombrePersona);

  function nombrePersona() {
    const busqueda = this.value.toLowerCase();
    console.debug('tecla pulsada, valor input ' + busqueda);
    if (busqueda) {
      const personasFiltradas = personas.filter(el => el.nombre.toLowerCase().includes(busqueda));
      pintarListado(personasFiltradas);
    } else {
      pintarListado(personas);
    }
  };
}

function pintarListado(arrayPersonas) {
  let listado = document.getElementById('personas');
  listado.innerHTML = '';

  arrayPersonas.forEach((el, i) => listado.innerHTML += `
      <li class="border border-dark p-1 row"> 
        <div class="col-2 imagen-personas">
          <img src="img/${el.avatar}" class="border border-danger rounded-circle">
          </div>
        <div class="col-8 nombre-personas" >
          <p>${el.nombre}</p>
        </div>
        <div class="col-1 iconos-personas">
          <i onclick="verDetalles(${i})" class="fas fa-pencil-alt float-right" data-toggle="tooltip" data-placement="top" title="Editar"></i>
        </div>       
        <div class="col-1 iconos-personas">
          <i onclick="eliminar(${i})" class="far fa-trash-alt float-right data-toggle="tooltip" data-placement="top" title="Eliminar""></i>
        </div>
      </li> `);
  console.debug(arrayPersonas);
}

function eliminar(indice) {
  console.debug(`Indice recibido para eliminar: %o`, indice);

  let personaSeleccionada = personas[indice];
  console.debug('Se elimina la persona %o ', personaSeleccionada);
  const mensaje = `¿Desea eliminar a ${personaSeleccionada.nombre}?`;
  if (confirm(mensaje)) {
    personas = personas.filter(el => el.id != personaSeleccionada.id);
    pintarListado(personas);
  }
}

function verDetalles(indice) {
  let ultimoId = parseFloat(indice) + 1;
  let personaSeleccionada = {
    "id": ultimoId,
    "nombre": "Sin-nombre",
    "avatar": "avatarPorDefecto.png",
    "sexo": "m"
  };

  if (indice >= 0 && indice < personas.length) {
    personaSeleccionada = personas[indice];
  }
  console.debug('click ver detalles de: %o', personaSeleccionada);

  document.getElementById('inputId').value = personaSeleccionada.id;
  document.getElementById('inputNombre').value = personaSeleccionada.nombre;
  document.getElementById('selectSexo').value = personaSeleccionada.sexo;
  document.getElementById('imagenAvatar').src = `img/${personaSeleccionada.avatar}`;
}

function guardar() {

  console.trace('Click en guardar');
  let id = document.getElementById('inputId').value;
  let nombre = document.getElementById('inputNombre').value;
  let sexo = document.getElementById('selectSexo').value;
  let avatar = document.getElementById('imagenAvatar').src;
  let textoReemplazado = avatar.replace("http://127.0.0.1:5500/appclient/img/","");
  avatar = textoReemplazado;
  /*   let imagen = document.getElementById('selectAvatar').value;
  console.debug(imagen); */
  if (id <= personas.length) {

    personas[id - 1] = {
      "id": id,
      "nombre": nombre,
      "avatar": avatar,
      "sexo": sexo
    }
    console.debug('Guardamos la persona seleccionada: %o', personas[id - 1]);
  } else {
    let persona = {
      "id": id,
      "nombre": nombre,
      "avatar": "avatarPorDefecto.png",
      "sexo": sexo
    }
    console.debug('Guardamos la nueva persona %o', persona);
    personas.push(persona);
  }
  pintarListado(personas);
}