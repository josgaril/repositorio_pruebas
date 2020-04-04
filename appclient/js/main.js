/* console.info('console.info es para mostrar mensajes de información depurando en el navegador');
console.debug('console.debug es una traza de tipo DEBUG');
console.trace('console.trace suele ser para tacear o decir <annonymous>');
console.warn('console.warn se utiliza para mandar mensajes de warning');
console.error('console.error se utiliza para mandar mensajes de error. Ej: Ha habido un error en la aplicación');
 */

window.addEventListener('load', init());

function init() {

    console.debug('Document Load and Ready');
    //es importante esperar que todo este cargando para comenzar


    const alumnos = [
                    {
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
        listado.innerHTML += `<li> <img src=${alumno.avatar}> ${alumno.nombre} </li> `
    }

}