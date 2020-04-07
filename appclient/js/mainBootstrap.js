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

  var idSelect = document.getElementById('idSelect');

  idSelect.addEventListener('change', seleccionarPersonas);
  pintarListado(personas);

  
}

function seleccionarPersonas() {
  var valor = this.value;
  console.debug('Seleccionamos las personas con sexo: ' + valor)
  if (valor != 'T'){
    const peronasFiltradas = personas.filter(el => el.sexo == valor);
    pintarListado(peronasFiltradas);
  }else{
    pintarListado(personas);
  }


}

function pintarListado(arrayPersonas) {
  let listado = document.getElementById('alumnos');
  listado.innerHTML = '';

  arrayPersonas.forEach(el => listado.innerHTML += `<li class="border border-dark p-1"> <img src=${el.avatar} class="border border-danger rounded-circle"> ${el.nombre}</li> `);
  console.debug(arrayPersonas);
}