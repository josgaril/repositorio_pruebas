"use strict";

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// este array se carga de forma asincrona mediante Ajax
//const endpoint = "http://127.0.0.1:5500/appclient/js/data/personas.json";

const endpoint = "http://localhost:8080/apprest/api/";
let personas = [];
let cursos = [];
let personaSeleccionada = {};

window.addEventListener('load', init());


/** 
 * Se ejecuta cuando está cargada la página completamente
*/
function init() {
  console.debug('Document Load and Ready');
  
  listener();
  galeriaImagenes();

  obtenerPersonas();
  obtenerCursosDisponibles();
  console.debug('continua la ejecuion del script de forma sincrona');
} //Fin function init


/**
 * Se inicializan los listener de index.html y se añade animación para la zona 
 * del buscador de personas
 */
function listener() {

  //FiltrarPersonas
  let selectorSexo = document.getElementById('sexoSelect');
  selectorSexo.addEventListener('change', filtroPersonas);
  let inputNombre = document.getElementById('nombreInput');
  inputNombre.addEventListener('keyup', filtroPersonas);

  //FiltrarCursos
  let inputCurso = document.getElementById('inputCurso');
  inputCurso.addEventListener('keyup', filtroCursos);

  //Animación buscador
  let formBuscador = document.querySelector('.Buscador');
  formBuscador.style.display= "block";
  formBuscador.classList.add("animated" , "slideInDown" , "slow");
} //Fin function listener


/**
 * Filtro para los cursos disponibles. Se muestra al escribir por lo menos 3 caracteres
 */
function filtroCursos() {
  let inputCurso = document.getElementById('inputCurso');
  const nombreCurso = inputCurso.value.trim().toLowerCase();

  if (nombreCurso.length >= 3) {
    console.debug('Nombre filtrado: %o ', nombreCurso);
    obtenerCursosDisponibles(nombreCurso);
  } else {
    obtenerCursosDisponibles();
  }
}//Fin function filtroCursos


/**
 * Filtro para  personas por sexo y nombre
 */
function filtroPersonas() {
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
} //Fin function filtroPersonas


/**
 * Pinta el listado de personas
 * @param {*} arrayPersonas  personas a pintar
 */
function pintarListado(arrayPersonas) {
  console.info('Se pinta el listado de personas');

  let listadoPersonas= document.getElementById('listado-personas');
  listadoPersonas.style.display="block";
  listadoPersonas.classList.add("animated","bounceInLeft", "delay-2" ,"slower");

  let listado = document.getElementById('personas');
  listado.innerHTML = '';

  arrayPersonas.forEach(el =>
    listado.innerHTML +=
    `
      <li class="border border-dark p-1 row"> 
        <span class="col-12 d-flex justify-content-end">Cursos: ${el.cursos.length}</span>
        <div class="col-3 imagen-personas ">
          <img src="img/${el.avatar}" class="border border-danger rounded-circle float-left"">
        </div>
        <div class="col-6 nombre-personas" >
          <p>${el.nombre}</p>
        </div>
        <div class="col-3 iconos-personas d-flex justify-content-end">
          <i onclick="verDetalles(${el.id})" class="fas fa-pencil-alt mr-1" data-toggle="tooltip" data-placement="top" title="Editar"></i>

          <i onclick="eliminarPersona(${el.id})" class="far fa-trash-alt float-right" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
        </div>
      </li> 
      `);
  console.debug(arrayPersonas);
} //Fin function pintarListado


/**
 * Rellena el formulario con los datos de la persona si se pulsa el botón de editar persona
 * Muestra el formulario vacíó si se pulsa el botón de nueva persona
 * @param {*} idPersona id de la persona
 */
function verDetalles(idPersona = 0) {

  let formPersona = document.getElementById('formulario-personas');
  formPersona.style.display = 'block';
  formPersona.classList.add('animated', 'fadeInRight');

   personaSeleccionada = personas.find(el => el.id == idPersona);
  if (!personaSeleccionada) {
    personaSeleccionada = {
      "id": 0,
      "nombre": "Sin-nombre",
      "avatar": "avatar7.png",
      "sexo": "h",
      "cursos": []
    };
    console.trace('Click Agregar nueva persona');

  } else {
    console.trace('Click Ver detalles de ' + personaSeleccionada.nombre, personaSeleccionada);
  }

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

  pintarCursosContratados(personaSeleccionada.cursos, personaSeleccionada.id);
} //Fin function verDetalles


/** 
 * Guarda los datos del formulario. Utiliza el servicio Rest
 * Si la persona ya existe (id!=0) se modifican sus datos (PUT)
 * Si la persona no existe (id==0) se crea la persona (POST)
*/
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

  //Modificar
  if (id != 0) {
    console.trace('Persona modificada');
    const url = endpoint + 'personas/' + persona.id;

    ajax('PUT', url, persona)
      .then(data => {
        // conseguir de nuevo todos los alumnos
        obtenerPersonas();
      })
      .catch(error => {
        console.warn(' No se ha podido modificar:', error);
        alert(error);
      });

  //Crear
  } else {
    console.trace('Creada nueva persona');

    const url = endpoint + 'personas/';
    ajax('POST', url, persona)
      .then(data => {
        // conseguir de nuevo todos los alumnos
        obtenerPersonas();
      })
      .catch(error => {
        console.warn('No se ha podido crear la persona:', error);
        alert(error);
      });
  }
} //Fin function guardar


/**
 * Elimina la persona indicada al pulsar en el botón de la papelera de su ficha. 
 * Llama al servicio Rest para DELETE
 * @param {*} idPersona 
 */
function eliminarPersona(idPersona) {
  console.debug(`Id de persona recibido para eliminar: %o`, idPersona);

  let personaSeleccionada = personas.find(el => el.id == idPersona);
  if (personaSeleccionada) {

    console.debug('Se eliminará la persona %o ', personaSeleccionada);

    const mensaje = `¿Desea eliminar a ${personaSeleccionada.nombre}?`;

    if (confirm(mensaje)) {

      const url = endpoint + 'personas/' + personaSeleccionada.id;

      ajax("DELETE", url, undefined)
        .then(data => {
          console.log('Persona eliminada');
          // conseguir de nuevo todos los alumnos
          obtenerPersonas();
          verDetalles();
        })
        .catch(error => {
          console.warn(' No se ha podido eliminar');
          alert(error);
        });
    } else {
      console.info('Se ha cancelado Eliminar a la persona');
    }
  } else {
    console.warn('No se ha encontrado la persona a eliminar');
    alert('No se ha encontrado la persona a eliminar');
  }
} //Fin function eliminarPersona


/**
 * Muestra todas las imagenes de los avatares
 */
function galeriaImagenes() {
  let imagenes = document.getElementById('gallery');
  for (let i = 1; i <= 7; i++) {
    imagenes.innerHTML += `<img onclick="seleccionarAvatar(event)" 
                        class="avatar" 
                        data-path="img/avatar${i}.png"
                        src="img/avatar${i}.png">`;
  }
} //Fin function galeriaImagenes


/**
 * Selecciona el avatar sobre el que se ha hecho el evento click
 * @param {*} evento 
 */
function seleccionarAvatar(evento) {
  console.trace('click en avatar');
  const avatares = document.querySelectorAll("#gallery img");
  avatares.forEach(el => el.classList.remove('selected'));
  evento.target.classList.add('selected');

  let inputAvatar = document.getElementById('inputAvatar');
  inputAvatar.value = evento.target.dataset.path;
} //Fin function selectAvatar


/**
 * Llama al servicio rest GET para obtener todas las personas y pinta la lista con esas personas
 */
function obtenerPersonas() {
  console.info('Obtenemos todas las personas');
  const url = endpoint + 'personas/';
  ajax("GET", url, undefined)
    .then(data => {
      console.trace('Promesa resuelta');
      personas = data;
      pintarListado(personas);
    }).catch(error => {
      console.warn('Promesa cancelada');
      alert(error);
    });
} //Fin function obtenerPersonas


/**
 * Llama al servicio rest GET para obtener los todos los cursos
 * Obtiene los cursos filtrados por nombre o todos en caso de no indicar nada.
 * @param {*} filtro muestra los cursos filtrados
 */
function obtenerCursosDisponibles(filtro = '') {
  console.info(`Obtenemos todos los cursos disponibles con filtro ${filtro}`);
  const url = endpoint + 'cursos/?filtro=' + filtro;

  ajax("GET", url, undefined)
    .then(data => {
      console.trace('Promesa resuelta');
      cursos = data;
      pintarCursosDisponibles(cursos);
    }).catch(error => {
      console.warn('Promesa cancelada');
      alert(error);
    });
} //Fin function obtenerCursosDisponibles


/**
 * Pinta todos los cursos disponibles en el modal
 * @param {*} cursosDisponibles 
 */
function pintarCursosDisponibles(cursosDisponibles) {
  console.info('Se pinta el listado de cursos disponibles');
  let ListadoCursosDisponibles = document.getElementById('cursosDisponibles');

  ListadoCursosDisponibles.innerHTML = '';

  cursosDisponibles.forEach(el => {

    ListadoCursosDisponibles.innerHTML +=
      `
          <li class="border-bottom border-dark row d-flex align-items-center"> 
            <div class="col-2">
              <img class="imagen-cursos" src="img/cursos/${el.imagen}" alt="img">
            </div>  
            <div class="col-5">
              <p>${el.nombre}</p>
            </div>
            <div class="col-3">
              <p>${el.precio} €</p>
            </div>
            <div class="col-2">
              <i onclick="contratarCurso(0, ${el.id})" class="far fa-plus-square float-right" data-toggle="tooltip" data-placement="top" title="Contratar curso"></i>
            </div>
          </li>
        `;
  });
  console.debug(cursosDisponibles);
} //Fin function pintarCursosDisponibles


/**
 * Pinta todos los cursos disponibles en el formulario de la persona
 * @param {*} cursosContratados 
 * @param {*} idPersona 
 */
function pintarCursosContratados(cursosContratados, idPersona) {
  console.debug('recibidos cursos contratados %o', cursosContratados);
  console.debug("Recibido id de persona: %o", idPersona);
  console.info('Se pinta el listado de cursos contratados por la persona');

  let ListadoCursosContratados = document.getElementById('cursosContratados');
  ListadoCursosContratados.style="block";
  ListadoCursosContratados.classList.add("animated", "bounceIn", "slow");

  ListadoCursosContratados.innerHTML = '';

  cursosContratados.forEach((el, i) => {

    ListadoCursosContratados.innerHTML +=
      `
            <li class="p-1 row d-flex justify-content-between-"> 
              
              <div class="col-9 p-0">
                <p>${el.nombre}</p>
              </div>
              
              <div class="col-3 ">
                <i id="eliminarCurso" onclick="eliminarCursoContratado(event,${idPersona},${el.id})" class="far fa-trash-alt float-right" data-toggle="tooltip" data-placement="top" title="Borrar curso contratado"></i>
              </div>
            </li>
          `;
  });
  console.debug(cursosContratados);
}//Fin function pintarCursosContratados


/**
 * Llama al servicio rest DELETE para eliminar el curso de una persona
 * @param {*} event 
 * @param {*} idPersona 
 * @param {*} idCurso 
 */
function eliminarCursoContratado(event,idPersona, idCurso) {
  console.debug(`Click eliminar el curso ${idCurso} de la persona ${idPersona}`);
  const url = endpoint + 'personas/' + idPersona + '/curso/'+ idCurso;
  ajax('DELETE', url, undefined)
    .then(data => {
      alert("Curso eliminado");
      
     event.target.parentElement.parentElement.classList.add("animated", "bounceOut", "slow")
     setTimeout(function(){
        event.target.parentElement.parentElement.remove();
        obtenerPersonas();
     },2000);

    })
    .catch( error => {
      alert("Error: " + error);
      console.warn("Error:" + error);
    });
}//Fin function eliminarCursoContratado


/**
 * LLama al servicio rest POST para contratar una curso para una persona
 * @param {*} idPersona 
 * @param {*} idCurso 
 */
function contratarCurso(idPersona = 0, idCurso) {
  idPersona = (idPersona!=0)?idPersona: personaSeleccionada.id;
  console.debug(`Click Contratar curso ${idCurso} para la persona ${idPersona} `);
  const url = endpoint + 'personas/' +idPersona + '/curso/' + idCurso;

  ajax('POST', url, undefined)
    .then(data => {
      alert("Curso contratado")
      let ListadoCursosContratados = document.getElementById('cursosContratados');
       const nuevoCurso = data;
      ListadoCursosContratados.innerHTML +=
      `
              <li class="p-1 row d-flex justify-content-between animated bounceIn"> 
                      
              <div class="col-9 p-0">
                <p>${nuevoCurso.nombre}</p>
              </div>
              
              <div class="col-3 ">
                <i id="eliminarCurso" onclick="eliminarCursoContratado(event,${idPersona},${nuevoCurso.id})" class="far fa-trash-alt float-right" data-toggle="tooltip" data-placement="top" title="Borrar curso contratado"></i>
              </div>
            </li>

          `; 

      console.info("Se ha contratado correctamente el curso.");
            //BUG actualizar cursos contratados cuando se añade uno

      setTimeout(function(){
        obtenerPersonas();
        console.debug("obtenemos las personas de nuevo para actualizar");
      //console.debug(obtenerPersonas);
        //pintarCursosContratados(personaSeleccionada.cursos, personaSeleccionada.id);
         },2000);
    })
    .catch(error => {
      console.debug(error);

      alert("Error: " + error);
      console.warn("Error:" + error);
    });
}//Fin function contratarCurso