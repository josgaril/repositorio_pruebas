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
const rol = "profesor";
let cursoSeleccionado = {};
let cursosProfesor = [];
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
  inputNombre.value="";
  inputNombre.addEventListener('keyup', filtroPersonas);

  
  //Comportamiento al pulsar sobre el botón Contratar cursos y abrir el modal  
  let modalButton = document.getElementById('modalButton');
  modalButton.addEventListener('click',function(){
    inputCurso.value="";   // Se vacía el input de la búsqueda de cursos
    obtenerCursosDisponibles(); //Se obtienen todos los cursos
  });

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
  if (arrayPersonas.length ==0){
    listado.innerHTML +=
    `
      <li class="border border-dark p-1 row"> 
          <p>No se han encontrado resultados para esa búsqueda</p>
      </li> 
      `;
  }else{
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
    }
  console.debug(arrayPersonas);
} //Fin function pintarListado


/**
 * Rellena el formulario con los datos del profesor si se pulsa el botón de editar persona
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
      "cursos": [],
      "rol": 2
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

  pintarCursosProfesor(personaSeleccionada);
} //Fin function verDetalles


/** 
 * Guarda los datos del formulario. Utiliza el servicio Rest
 * Si el profesor ya existe (id!=0) se modifican sus datos (PUT)
 * Si el profesor no existe (id==0) se crea el profesor (POST)
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
    "sexo": sexo,
    "rol": 2
  }

  //Modificar
  if (id != 0) {
    console.trace('Modificadar profesor');
    const url = endpoint + 'personas/' + persona.id;

    ajax('PUT', url, persona)
      .then(data => {
        alert("Profesor modificado con éxito");

        // conseguir de nuevo todos los alumnos
        obtenerPersonas();
      })
      .catch(error => {
        console.warn(' No se ha podido modificar el profesor:', error);
        alert(error);
      });

  //Crear
  } else {
    console.trace('Crear nuevo profesor');

    const url = endpoint + 'personas/';
    ajax('POST', url, persona)
      .then(data => {
        alert("Profesor creado con éxito");

        // conseguir de nuevo todos los alumnos
        obtenerPersonas();
      })
      .catch(error => {
        console.warn('No se ha podido crear el profesor:', error);
        alert(error);
      });
  }
} //Fin function guardar


/**
 * Elimina el profesor indicada al pulsar en el botón de la papelera de su ficha. 
 * Llama al servicio Rest para DELETE
 * @param {*} idPersona 
 */
function eliminarPersona(idPersona) {
  console.debug(`Id del profesor recibido para eliminar: %o`, idPersona);

  let personaSeleccionada = personas.find(el => el.id == idPersona);
  if (personaSeleccionada) {

    console.debug('Se eliminará el profesor %o ', personaSeleccionada);

    const mensaje = `¿Desea eliminar a ${personaSeleccionada.nombre}?`;

    if (confirm(mensaje)) {

      const url = endpoint + 'personas/' + personaSeleccionada.id;

      ajax("DELETE", url, undefined)
        .then(data => {
          console.log('Profesor eliminado');
          // conseguir de nuevo todos los alumnos
          obtenerPersonas();
          alert("Profesor eliminado");
        })
        .catch(error => {
          console.warn(' No se ha podido eliminar');
          alert(error);
        });
    } else {
      console.info('Se ha cancelado Eliminar profesor');
    }
  } else {
    console.warn('No se ha encontrado el profesor a eliminar');
    alert('No se ha encontrado el profesor a eliminar');
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
function obtenerPersonas(rol = "profesor") {
  console.info('Obtenemos todas las personas');
  console.debug('Personas cuyo rol es: ' + rol);
  const url = endpoint + 'personas/?rol=' + rol;
  ajax("GET", url, undefined)
    .then(data => {
      console.trace('Promesa resuelta');
      personas = data;
      pintarListado(personas);
    }).catch(error => {
      console.warn('Promesa rechazada');
      alert("Lo sentimos pero no funciona la conexión");
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
      console.warn('Promesa rechazada');
      alert("Lo sentimos pero no funciona la conexión");
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

  
  if (cursosDisponibles.length==0){
    ListadoCursosDisponibles.innerHTML +=
    `
    <li class="d-flex justify-content-center"> 
      <p>No se han encontrado resultados para esa búsqueda</p>
    </li> 
      `;
  }else{
    cursosDisponibles.forEach(el => {
      ListadoCursosDisponibles.innerHTML +=
        `
            <li class="border-bottom border-dark row d-flex align-items-center"> 
              <div class="col-2">
                <img class="imagen-cursos pt-1" src="img/cursos/${el.imagen}" alt="img">
              </div>  
              <div class="col-4 col-sm-5">
                <p>${el.nombre}</p>
              </div>
              <div class="col-2 pl-1">
                <p>${el.precio}€</p>
              </div>
              <div class="col-2 p-0">
                <p> ${el.profesor.nombre?el.profesor.nombre:""}</p>
              </div>
              <div class="col-1">                
                <i onclick="asignarCursoProfesor(${el.id})" class="far fa-plus-square float-right" data-toggle="tooltip" data-placement="top" title="Asignar curso al profesor"></i>
              </div>
            </li>
          `;
    });
}
  console.debug(cursosDisponibles);
} //Fin function pintarCursosDisponibles


/**
 * Pinta todos los cursos disponibles en el formulario de la persona
 * @param {*} personaSeleccionada
 */
function pintarCursosProfesor(personaSeleccionada) {
  console.info('Se pinta el listado de cursos del profesor');
  console.debug('Los cursos del profesor son:  %o', personaSeleccionada.cursos);

  let ListadoCursosProfesor = document.getElementById('cursosProfesor');
  ListadoCursosProfesor.style="block";
  ListadoCursosProfesor.classList.add("animated", "bounceIn", "slow");

  ListadoCursosProfesor.innerHTML = '';
  cursosProfesor= personaSeleccionada.cursos;
  
  let botonModal = document.getElementById('modalButton');

  if (personaSeleccionada.id < 1){
    ListadoCursosProfesor.innerHTML += 
      `
        <spam> Guarde los datos del nuevo profesor y edítelo para asignarle cursos.</spam>
      `;
    botonModal.disabled = true;
  }else{
    botonModal.disabled = false;
      cursosProfesor.forEach( el => {

      ListadoCursosProfesor.innerHTML +=
          `
                <li class="p-1 row d-flex justify-content-between-"> 
                  
                  <div class="col-9 p-0">
                    <p>${el.nombre}</p>
                  </div>
                  
                  <div class="col-3 ">
                    <i id="desasignarCursoProfesor" onclick="desasignarCursoProfesor(event,${el.id})" class="far fa-trash-alt float-right" data-toggle="tooltip" data-placement="top" title="Desasignar curso"></i>
                  </div>
                </li>
          `;
      });
  }

}//Fin function pintarCursosProfesor


/**
 * Llama al servicio rest PUT para desasignar el curso al profesor
 * @param {*} event 
 * @param {*} idCurso
 */
function desasignarCursoProfesor(event,idCurso) {
  console.trace("Click desasignar curso: %o", idCurso);
 
  
  let cursoAModificar = cursos.find(el=> el.id == idCurso);
  cursoAModificar.profesor=null;

  const url = endpoint + 'cursos/' + cursoAModificar.id;
  ajax('PUT', url, cursoAModificar)
    .then(data => {
      alert("Curso desasignado");
      
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
}//Fin function desasignarCursoProfesor


/**
 * LLama al servicio rest PUT para asignar el curso al profesor 
 * @param {*} idCurso 
 */
function asignarCursoProfesor(idCurso) {
  console.debug("Click Asignar curso %o al profesor %o",idCurso,personaSeleccionada);
  const url = endpoint + 'cursos/' + idCurso;
  cursoSeleccionado = cursos.find( el => el.id == idCurso);

  cursoSeleccionado.profesor = personaSeleccionada;

  ajax('PUT', url, cursoSeleccionado)
    .then(data => {
      alert("Curso asignado")
      let ListadoCursosProfesor = document.getElementById('cursosProfesor');
       const nuevoCurso = data;
       ListadoCursosProfesor.innerHTML +=
      `
              <li class="p-1 row d-flex justify-content-between animated bounceIn"> 
                      
              <div class="col-9 p-0">
                <p>${nuevoCurso.nombre}</p>
              </div>
              
              <div class="col-3 ">
                <i id="desasignarCursoProfesor" onclick="desasignarCursoProfesor(event,${nuevoCurso.id})" class="far fa-trash-alt float-right" data-toggle="tooltip" data-placement="top" title="Desasignar curso"></i>
              </div>
            </li>

          `; 

      console.info("Se ha asignado correctamente el curso.");
      obtenerCursosDisponibles();
      setTimeout(function(){
      
        obtenerPersonas();
        obtenerCursosDisponibles();
        console.debug("Obtenemos las personas de nuevo y los cursos disponibles para actualizar");
         },1000);
    })
    .catch(error => {
      console.debug(error);

      alert("Error: " + error);
      obtenerCursosDisponibles();
    });
    inputCurso.value="";

}//Fin function asignarCursoProfesor
