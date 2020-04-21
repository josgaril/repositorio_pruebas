"use strict";

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// este array se carga de forma asincrona mediante Ajax
//const url = "http://127.0.0.1:5500/appclient/js/data/personas.json";

const url = "http://localhost:8080/apprest/api/personas/";
let personas = [];
let cursos = [];
window.addEventListener('load', init());

function init() {
  console.debug('Document Load and Ready');
  obtenerCursosDisponibles();

  listener();

  galeriaImagenes();

  const promesa = obtenerTodos();
  console.debug('continua la ejecuion del script de forma sincrona');

} //Fin function init

function listener() {
  let selectorSexo = document.getElementById('sexoSelect');
  selectorSexo.addEventListener('change', filtro);
  let inputNombre = document.getElementById('nombreInput');
  inputNombre.addEventListener('keyup', filtro);

  let inputCurso = document.getElementById('inputCurso');
  inputCurso.addEventListener('keyup', filtroCurso);
} //Fin function listener

function filtroCurso() {
  let inputCurso = document.getElementById('inputCurso');
  const nombreCurso = inputCurso.value.trim().toLowerCase();

  if (nombreCurso.length >= 3) {
    console.debug('Nombre filtrado: %o ', nombreCurso);
    obtenerCursosDisponibles(nombreCurso);
  } else {
    obtenerCursosDisponibles();
  }
}


function filtro() {
  let selectorSexo = document.getElementById('sexoSelect');
  let inputNombre = document.getElementById('nombreInput');

  const sexo = selectorSexo.value;
  const nombre = inputNombre.value.trim().toLowerCase();

  console.trace(`filtro sexo=${sexo} nombre=${nombre}`);
  console.debug('personas %o', personas);

  let personasFiltradas = personas.map(el => el);

  if (sexo == 'h' || sexo == 'm') {
    personasFiltradas = personasFiltradas.filter(el => el.sexo == sexo);
    console.debug('Filtrado por sexo %o ', personasFiltradas);
  }

  if (nombre != " ") {
    personasFiltradas = personasFiltradas.filter(el => el.nombre.toLowerCase().includes(nombre));
    console.debug('Filtrado por nombre %o ', personasFiltradas);
  }

  pintarListado(personasFiltradas);
} //Fin function filtro

function pintarListado(arrayPersonas) {
  console.info('Se pinta el listado de personas');
  let listado = document.getElementById('personas');
  listado.innerHTML = '';

  arrayPersonas.forEach((el, i) =>
    listado.innerHTML +=
    `
      <li class="border border-dark p-1 row"> 
        <div class="col-3 imagen-personas ">
          <img src="img/${el.avatar}" class="border border-danger rounded-circle float-left"">
        </div>
        <div class="col-6 nombre-personas" >
          <p>${el.nombre}</p>
        </div>
        <div class="col-3 iconos-personas d-flex justify-content-end">
          <i onclick="verDetalles(${el.id})" class="fas fa-pencil-alt mr-1" data-toggle="tooltip" data-placement="top" title="Editar"></i>

          <i onclick="eliminar(${el.id})" class="far fa-trash-alt float-right" data-toggle="tooltip" data-placement="top" title="Eliminar""></i>
        </div>
      </li> 
      `);
  console.debug(arrayPersonas);
} //Fin function pintarListado

function verDetalles(idPersona) {

 
  let personaSeleccionada = personas.find(el => el.id == idPersona);
    if (!personaSeleccionada){
       personaSeleccionada = {
        "id": 0,
        "nombre": "Sin-nombre",
        "avatar": "avatar7.png",
        "sexo": "h"
      };
      console.trace('Click Agregar nueva persona');

    } else {
      console.trace('Click Ver detalles de ' + personaSeleccionada.nombre, personaSeleccionada);
  }

 /*  let personaSeleccionada = {
    "id": 0,
    "nombre": "Sin-nombre",
    "avatar": "avatar7.png",
    "sexo": "h"
  };

  //find
  if (idPersona > 0) {
    personaSeleccionada = personas.find(el => el.id == idPersona);
    //find
    console.trace('Click Ver detalles de ' + personaSeleccionada.nombre, personaSeleccionada);
  } else {
    console.trace('Click Agregar nueva persona');
  } */
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


} //Fin function verDetalles

function guardar() {
  console.trace('Click en guardar');

  let id = document.getElementById('inputId').value;
  let nombre = document.getElementById('inputNombre').value;
  let avatar = document.getElementById('inputAvatar').value;
  let avatarImagen = avatar.replace("img/", "");
  avatar = avatarImagen;
  let sexo = "h";
  let checkHombre = document.getElementById('sexoH').checked;

  if (!checkHombre) {
    sexo = "m";
  }

  let persona = {
    "id": id,
    "nombre": nombre,
    "avatar": avatar,
    "sexo": sexo
  }

  if (id != 0) {
    console.trace('Persona modificada');
    const urlID = url + persona.id;

    ajax('PUT', urlID, persona)
      .then(data => {
        // conseguir de nuevo todos los alumnos
        obtenerTodos();
      })
      .catch(error => {
        console.warn(' No se ha podido modificar:', error);
        alert(error);
      });
  } else {
    console.trace('Creada nueva persona');

    ajax('POST', url, persona)
      .then(data => {
        // conseguir de nuevo todos los alumnos
        obtenerTodos();
      })
      .catch(error => {
        console.warn('No se ha podido crear la persona:', error);
        alert(error);
      });
  }
} //Fin function guardar

function eliminar(idPersona) {
  console.debug(`Id de persona recibido para eliminar: %o`, idPersona);

  let personaSeleccionada = personas.find(el => el.id == idPersona);
  if (personaSeleccionada) {

    console.debug('Se eliminará la persona %o ', personaSeleccionada);

    const mensaje = `¿Desea eliminar a ${personaSeleccionada.nombre}?`;

    if (confirm(mensaje)) {

      const urlELiminar = url + personaSeleccionada.id;

      ajax("DELETE", urlELiminar, undefined)
        .then(data => {
          console.log('Persona eliminada');
          // conseguir de nuevo todos los alumnos
          obtenerTodos();
        })
        .catch(error => {
          console.warn(' No se ha podido eliminar');
          alert(error);
        });
    } else {
      console.info('Se ha cancelado Eliminar a la persona');
    }
  } else {
    console.warn('No se ha encontrado la persona a eliminar a %o', personaSeleccionada)
  }
} //Fin function eliminar

function galeriaImagenes() {
  let imagenes = document.getElementById('gallery');
  for (let i = 1; i <= 7; i++) {
    imagenes.innerHTML += `<img onclick="selectAvatar(event)" 
                        class="avatar" 
                        data-path="img/avatar${i}.png"
                        src="img/avatar${i}.png">`;
  }
} //Fin function galeriaImagenes

function selectAvatar(evento) {
  console.trace('click en avatar');
  const avatares = document.querySelectorAll("#gallery img");
  avatares.forEach(el => el.classList.remove('selected'));
  evento.target.classList.add('selected');

  let inputAvatar = document.getElementById('inputAvatar');
  inputAvatar.value = evento.target.dataset.path;
} //Fin function selectAvatar

function obtenerTodos() {
  console.info('Obtenemos todas las personas');
  ajax("GET", url, undefined)
    .then(data => {
      console.trace('Promesa resuelta');
      personas = data;
      pintarListado(personas);
    }).catch(error => {
      console.warn('Promesa cancelada');
      alert(error);
    });

} //Fin function obtenerTodos

//TODO pasar por defecto filtro =''. a la hora de cargar cursos cargaria esta funcion siempre
function obtenerCursosDisponibles(filtro = '') {
  console.info(`Obtenemos todos los cursos disponibles con filtro ${filtro}`);
  const urlCursosDisponibles = `http://localhost:8080/apprest/api/cursos/?filtro=${filtro}`

  ajax("GET", urlCursosDisponibles, undefined)
    .then(data => {
      console.trace('Promesa resuelta');
      cursos = data;
      pintarListadoCursosDisponibles(cursos);
    }).catch(error => {
      console.warn('Promesa cancelada');
      alert(error);
    });
} //Fin function obtenerCursosDisponibles

function pintarListadoCursosDisponibles(cursosDisponibles) {
  console.info('Se pinta el listado de cursos disponibles');

  let ListadoCursosDisponibles = document.getElementById('cursosDisponibles');

  ListadoCursosDisponibles.innerHTML = '';

  cursosDisponibles.forEach((el, i) => {

    ListadoCursosDisponibles.innerHTML +=
      `
          <li class="border border-dark p-1 row"> 
            <div class="col-2">
              <img src="${el.imagen}" alt="img">
            </div>  
            <div class="col-6">
              <p>${el.nombre}</p>
            </div>
            <div class="col-3">
              <p>${el.precio} €</p>
            </div>
            <div class="col-1">
              <i onclick="añadirCurso(${i})" class="far fa-plus-square float-right" data-toggle="tooltip" data-placement="top" title="Añadir curso"></i>
            </div>
          </li>
        `;
  });
  console.debug(cursosDisponibles);
} //Fin function pintarListadoCursosDisponibles

function vaciarNombreCurso(){
  let inputCurso = document.getElementById('inputCurso');
  inputCurso.innerHTML = '';
}