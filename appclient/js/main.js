"use strict";

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// este array se carga de forma asincrona mediante Ajax
//const url = "http://127.0.0.1:5500/appclient/js/data/personas.json";

const url = "http://localhost:8080/apprest/api/personas/";
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

  galeriaImagenes();

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

function verDetalles(indice) {
  let personaSeleccionada = {
    "id": 0,
    "nombre": "Sin-nombre",
    "avatar": "avatar7.png",
    "sexo": "h"
  };

  if (indice >= 0 && indice < personas.length) {
    personaSeleccionada = personas[indice];
    console.trace('Click Ver detalles de %o: %o', personaSeleccionada.nombre, personaSeleccionada);
  }
  console.trace('Click Agregar nueva persona');

  document.getElementById('inputId').value = personaSeleccionada.id;
  document.getElementById('inputNombre').value = personaSeleccionada.nombre;
  document.getElementById('inputAvatar').value = personaSeleccionada.avatar;


  const avatares = document.querySelectorAll('#gallery img');
  avatares.forEach(el => {
    el.classList.remove('selected');
    if ("img/" + personaSeleccionada.avatar == el.dataset.path) {
      el.classList.add('selected');
    }
  });

  const sexo = personaSeleccionada.sexo;
  let checkHombre = document.getElementById('sexoH');
  let checkMujer = document.getElementById('sexoM');

  if (sexo == "h") {
    checkHombre.checked = 'checked';
    checkMujer.checked = '';
  } else {
    checkHombre.checked = '';
    checkMujer.checked = 'checked';
  }
}

function guardar() {
  console.trace('Click en guardar');

  let id = document.getElementById('inputId').value;
  let nombre = document.getElementById('inputNombre').value;
  let avatar = document.getElementById('inputAvatar').value;
  let avatarImagen = avatar.replace("img/", "");
  avatar = avatarImagen;
  let sexo = "h";
  let checkHombre = document.getElementById('sexoH').checked;
  
  if (!checkHombre){
   sexo = "m";
  }

  let persona = {
    "id": id,
    "nombre": nombre,
    "avatar": avatar,
    "sexo": sexo
  }

  if (id != 0) {
    console.trace('Modificar persona');

    const urlID = url + persona.id;
    
    ajax('PUT', urlID, persona)
      .then(data => {

        // conseguir de nuevo todos los alumnos
        ajax("GET", url, undefined)
          .then(data => {
            console.trace('promesa resolve');
            personas = data;
            pintarListado(personas);
          }).catch(error => {
            console.warn('promesa rejectada');
            alert(error);
          });
      })
      .catch(error => {
        console.warn(' No se ha podido modificar');
        alert(error);
      });
  } else {
    console.trace('Crear nueva persona');

    ajax('POST', url, persona)
      .then(data => {

        // conseguir de nuevo todos los alumnos
        ajax("GET", url, undefined)
          .then(data => {
            console.trace('promesa resolve');
            personas = data;
            pintarListado(personas);

          }).catch(error => {
            console.warn('promesa rejectada');
            alert(error);
          });

      })
      .catch(error => {
        console.warn('No se ha podido crear la persona');
        alert(error);
      });
  }
}

function eliminar(indice) {
  console.debug(`Indice recibido para eliminar: %o`, indice);

  let personaSeleccionada = personas[indice];
  console.debug('Se elimina la persona %o ', personaSeleccionada);

  const mensaje = `¿Desea eliminar a ${personaSeleccionada.nombre}?`;

  if (confirm(mensaje)) {

    const urlELiminar = url + personaSeleccionada.id;

    ajax("DELETE", urlELiminar, undefined)
      .then(data => {

        // conseguir de nuevo todos los alumnos
        ajax("GET", url, undefined)
          .then(data => {
            console.trace('promesa resolve');
            personas = data;
            pintarListado(personas);
          }).catch(error => {
            console.warn('promesa rejectada');
            alert(error);
          });
      })
      .catch(error => {
        console.warn(' No se ha podido eliminar');
        alert(error);
      });
      pintarListado(personas);
  }
}

function galeriaImagenes() {
  let imagenes = document.getElementById('gallery');
  for (let i = 1; i <= 7; i++) {
    imagenes.innerHTML += `<img onclick="selectAvatar(event)" 
                        class="avatar" 
                        data-path="img/avatar${i}.png"
                        src="img/avatar${i}.png">`;
  }
}

function selectAvatar(evento) {
  console.trace('click en avatar');
  const avatares = document.querySelectorAll("#gallery img");
  avatares.forEach(el => el.classList.remove('selected'));
  evento.target.classList.add('selected');

  let inputAvatar = document.getElementById('inputAvatar');
  inputAvatar.value = evento.target.dataset.path;
}