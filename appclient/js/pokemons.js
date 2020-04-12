window.addEventListener('load', init());

function init() {

    const url = 'https://pokeapi.co/api/v2/pokemon/';
    let listado = document.getElementById('lista');
    listado.innerHTML = '';
    const promesa = ajax("GET", url, undefined);
    console.trace('promesa resolve');
    promesa.then(data => {
        let pokemons = data.results;
        pokemons.forEach(pokemon => {
            listado.innerHTML +=
                `
                                <button onclick="cargarDetalles('${pokemon.url}')">
                                    <li class="list-group-item" >${pokemon.name}</li>
                                </button>
                        `
        }); // FIn forEach

    }).catch(error => {
        console.warn('promesa reject');
        alert(error);
    }); // FIn promesa.then.catch

}

function cargarDetalles(pokemonURL) {
    const urlDetalles = `${pokemonURL}`;
    
    let promesa = ajax("GET", urlDetalles, undefined);
    promesa.then(data => {
        console.trace('promesa resolve');

        const pokemonDetalles = data;

        console.debug('Obtenemos los detalles del pokemon: %o', pokemonDetalles.name);

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


        const pokemonAbilities = pokemonDetalles.abilities;
        abilitiesPokemon.innerHTML = '';
        pokemonAbilities.forEach(pabilities => {

            abilitiesPokemon.innerHTML +=
                ` 
                        <p class="dropdown-item"> ${pabilities.ability.name}</p>
                        `
        }); //fin pokemonAbilities.forEach

        const pokemonStats = pokemonDetalles.stats;
        statsPokemon.innerHTML = '';
        pokemonStats.forEach(pstats => {
            statsPokemon.innerHTML +=
                `
                        <p class="dropdown-item">${pstats.stat.name} (${pstats.base_stat})</p>
                        `
                    }); //fin pokemonStats.forEach

        const pokemonMoves = pokemonDetalles.moves;
        movesPokemon.innerHTML = '';
        pokemonMoves.forEach(pmove => {
            movesPokemon.innerHTML +=
                `
                             <p class="dropdown-item">${pmove.move.name}</p>

                        `
        }); //fin pokemonMoves.forEach
    }).catch(error=> {
        console.warn('promesa reject');
        alert(error);
    }); // FIn promesa.then.catch

} // function cargarDEtalles