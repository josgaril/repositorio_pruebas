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
                            <div class="card-title row ">
                                    <div class="col-12 mb-1 col-sm-10"> 
                                        <spam class="tituloNoticia" >${el.titulo}</spam>
                                    </div>
                                    <div class="col-12 col-sm-2">
                                        <span class="d-flex justify-content-end">${el.fecha}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-text mb-2">${el.contenido}</div>
                        </div>
                    </div>
                    `

            );
        }).catch(error => {
            console.debug('Promesa rejectada');
            console.debug(error);
            alert(error);
        });

}