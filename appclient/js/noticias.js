window.addEventListener('load', init());

function init() {
    const endpoint = 'http://localhost:8080/apprest/api/';


    const url = endpoint + 'noticias/';
    //Cargar todos los datos
    ajax('GET', url, undefined)
        .then(data => {
            console.info("Promesa resuelta");
            noticias = data;
            let tarjetasNoticias = document.getElementById('tarjetasNoticias');
            tarjetasNoticias.innerHTML = '';

            noticias.forEach(el => 

                tarjetasNoticias.innerHTML +=
                    `   
                    <div class="card tarjetas col-12" >
                        <div class="card-body ">
                            <div class=card-title row ">
                                    <div class="col-8"> 
                                        <span class="d-flex justify-content-left" >${el.titulo}</span>
                                    </div>
                                    <div class="col-4">
                                    <span class="auto">${el.fecha}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="card-text mb-2">${el.contenido}</div>
                        </div>
                    </div>
                    `

            );
        }).catch(error => {
            console.debug('Promesa rechazada');
            alert("Lo sentimos pero no funciona la conexión");
        });

}