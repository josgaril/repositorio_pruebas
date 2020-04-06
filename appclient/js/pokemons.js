window.addEventListener('load', init());

        function init() {

            const url = 'https://pokeapi.co/api/v2/pokemon/';

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    console.info('peticion GET ' + url);
                    const jsonData = JSON.parse(this.responseText);
                    console.debug(jsonData);
                    const pokemons = jsonData.results;

                    let listado = document.getElementById('lista');
                    listado.innerHTML = '';

                    pokemons.forEach(pokemon => {
                        listado.innerHTML += 
                        `
                                <button onclick="cargarDetalles('${pokemon.url}')">
                                    <li class="list-group-item" >${pokemon.name}</li>
                                </button>
                        `
                    }); //forEach                  
                } //this.readyState == 4 && this.status == 200

            }; //xhttp.onreadystatechange = function () 
            xhttp.open("GET", url, true);
            xhttp.send();
        }

        function cargarDetalles(pokemonURL) {
            const url2 = `${pokemonURL}`;
            //const url2 = 'https://pokeapi.co/api/v2/pokemon/pikachu';
            var xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.info('Obtenemos los detalles del pokemon seleccionado');


                    const pokemonDetalles = JSON.parse(this.responseText);
                    
                    let elNombre = document.getElementById('nombrePokemon');
                    elNombre.textContent = pokemonDetalles.name; 
                    
                    let elImagen = document.getElementById('imagenPokemon')
                    elImagen.src = pokemonDetalles.sprites.front_default;
                    
                    let elId = document.getElementById('idPokemon');
                    elId.textContent = 'ID: ' + pokemonDetalles.id; 
                    
                    let elHeight = document.getElementById('heightPokemon');
                    elHeight.textContent = 'Height: ' + pokemonDetalles.height; 

                    let elWeight = document.getElementById('weightPokemon');
                    elWeight.textContent = 'Weight: ' + pokemonDetalles.weight; 
                   
                    let elOrder = document.getElementById('orderPokemon');
                    elOrder.textContent = 'Order: ' + pokemonDetalles.order; 


                    const pokemonAbilities= pokemonDetalles.abilities;
                    abilitiesPokemon.innerHTML='';
                    pokemonAbilities.forEach( pforms => {
                        
                        abilitiesPokemon.innerHTML +=
                            ` 
                            <p class="dropdown-item"> ${pforms.ability.name}</p>
                            `
                    });//fin pokemonAbilities.forEach(pokemonAbilities => {

                    const pokemonStats = pokemonDetalles.stats;
                    statsPokemon.innerHTML = '';
                    pokemonStats.forEach( pstats => {
                        statsPokemon.innerHTML +=
                            `
                            <p class="dropdown-item">${pstats.stat.name} (${pstats.base_stat})</p>
                            `
                    });
                    
                    const pokemonMoves = pokemonDetalles.moves;
                    movesPokemon.innerHTML = '';
                    pokemonMoves.forEach( pmove => {
                        movesPokemon.innerHTML +=
                            `
                                 <p class="dropdown-item">${pmove.move.name}</p>

                            `
                    });

                } // his.readyState == 4 && this.status == 200

            }; // onreadystatechange

            xhttp2.open("GET", url2, true);
            xhttp2.send();

        } // function cargarDEtalles