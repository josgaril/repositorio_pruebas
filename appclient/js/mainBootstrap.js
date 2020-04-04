window.addEventListener('load', init());

function init() {

  console.debug('Document Load and Ready');


  let alumnos = [{
      "nombre": "Occonnor",
      "genero": "F",
      "avatar": "img/avatar1.png"
    },
    {
      "nombre": "Pepa",
      "genero": "F",
      "avatar": "img/avatar2.png"
    },
    {
      "nombre": "JoseMari",
      "genero": "H",
      "avatar": "img/avatar3.png"
    },
    {
      "nombre": "JuanCarlos",
      "genero": "H",
      "avatar": "img/avatar4.png"
    },
    {
      "nombre": "Monica",
      "genero": "F",
      "avatar": "img/avatar5.png"
    },
    {
      "nombre": "Alberto",
      "genero": "H",
      "avatar": "img/avatar6.png"
    },
    {
      "nombre": "Rafael",
      "genero": "H",
      "avatar": "img/avatar7.png"
    }
  ]

  let listado = document.getElementById('alumnos');
  listado.innerHTML = '';

  for (let i = 0; i < alumnos.length; i++) {
    const alumno = alumnos[i];
    listado.innerHTML += `<li class="border border-dark p-1"> <img src=${alumno.avatar} class="border border-danger rounded-circle"> ${alumno.nombre}</li> `
  }






}