window.addEventListener('load', init());

let personasAMostrar = document.getElementById('numPersonas');
let elBotonMostrar = document.getElementById('boton');
//let elBotonMostrar = document.querySelector('div#botonMostrar button');
elBotonMostrar.addEventListener('click', mostrar);

function init() {
    console.debug('Documento cargado y listo');
    
    mostrar();
}


function mostrar() {
    let numero = document.getElementById('numPersonas').value;
    if (numero == '') {
        numero = 8; //Mostramos 8 personas por defecto si no se introduce un número de personas
    }
    console.debug('numero de personas a mostrar: %o', numero);
    
    let elListado = document.getElementById('listado');
    elListado.innerHTML = '';

    const url = `https://randomuser.me/api/?results=${numero}`;     
    
    const promesa = ajax("GET", url, undefined);
    promesa.then(data => {
        console.trace('promesa resolve');
        personas = data.results;
        personas.forEach(persona => {
                    elListado.innerHTML +=
                    `
                        <div class="card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"> 
                            <img src="${persona.picture.large}" class="card-img-top" alt="avatar"/>
                            <div class="card-body">
                                <div>
                                    <p class="card-text"><b>Nombre:</b> ${persona.name.first} ${persona.name.last}</p>
                                    <p class="card-text">Sexo: ${persona.gender}</p>
                                    <p class="card-text">CIudad: ${persona.location.city}</p>
                                    <p class="card-text">Pais: ${persona.location.country}</p>
                                    <p class="card-text">Estado: ${persona.location.state}</p>
                                    <p class="card-text">Email: ${persona.email}</p>
                                    <p class="card-text">Edad: ${persona.dob.age}</p>
                                </div>
                            </div>
                        </div>
                     `;
        });// FIn forEach
    }).catch(error => {
        console.warn('promesa rejectada');
        alert(error);
    }); // FIn promesa.then.catch

    console.debug('continua la ejecuion del script de forma sincrona');

} // function mostrar()