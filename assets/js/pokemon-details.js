// Obter o ID do Pokémon da URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonId = urlParams.get('id');
// Função para buscar os detalhes do Pokémon
async function fetchPokemonDetails(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    renderPokemonDetails(pokemon);
}

// Função para renderizar os detalhes do Pokémon
function renderPokemonDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemon-details');
    const types = pokemon.types.map(type => type.type.name);
    
    pokemonDetails.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>#${pokemon.id}</p>
        ${types.map(type => `<span class="type ${type}">${type}</span>`).join('')}
        <div class="pokemon-sections">
            <h3>Sobre</h3>
            <ul>
                <li>Altura: ${pokemon.height / 10} m</li>
                <li>Peso: ${pokemon.weight / 10} kg</li>
            </ul>
        </div>
        
        <div class="pokemon-sections">
            <h3>Estatísticas</h3>
            <ul>
                ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
            </ul>
        </div>
        <div class="pokemon-sections" id="evolutions">
            <h3>Evoluções</h3>
            <!-- As evoluções serão carregadas dinamicamente -->
        </div>
    `;
    fetchPokemonEvolution(pokemon.species.url);
}

// Função para buscar a cadeia de evolução do Pokémon
async function fetchPokemonEvolution(speciesUrl) {
    const response = await fetch(speciesUrl);
    const speciesData = await response.json();
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();
    
    renderEvolutions(evolutionData.chain);
}

// Função para renderizar a cadeia de evolução
function renderEvolutions(evolutionChain) {
    const evolutionSection = document.getElementById('evolutions');
    let evolutionsHTML = '';
    let currentEvolution = evolutionChain;
    do {
        evolutionsHTML += `<li>${currentEvolution.species.name}</li>`;
        currentEvolution = currentEvolution.evolves_to[0];
    } while (currentEvolution);
    evolutionSection.innerHTML += `<ul>${evolutionsHTML}</ul>`;
}

// Função para voltar à página anterior
function goBack() {
    window.history.back();
}

// Chama a função para buscar os detalhes do Pokémon
fetchPokemonDetails(pokemonId);