window.addEventListener('load', init());

function init() {
    const endpoint = 'http://localhost:8080/apprest/api/';


    const url = endpoint + 'noticias/';
    //Cargar todos los datos
    ajax('GET', url, undefined)
        .then(data => {
            console.info("promesa resuelta");
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

                            <p class="card-text mb-2">${el.contenido}</p>
                        </div>
                    </div>
                    `
                //<p class="fecha">fecha: <fmt:formatDate value="${sesion.fecha}" pattern="dd-MM-yyyy HH:mm" /></p>

            );
        }).catch(error => {
            console.debug('Promesa rejectada');
            console.debug(error);
            alert(error);
        });

}