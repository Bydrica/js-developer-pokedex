const typeColors = {
    grass: '#78c850',
    fire: '#f08030',
    water: '#6890f0',
    poison: '#a040a0',
    flying: '#a890f0',
    bug: '#a8b820',
    normal: '#a8a878',
    electric: '#f8d030',
    ground: '#e0c068',
    fairy: '#f8a0e0',
    fighting: '#c03028',
    psychic: '#f85888',
    rock: '#b8a038',
    ghost: '#705898',
    ice: '#98d8d8',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0'
};
function renderPokemons(pokemons) {
    pokemons.forEach(pokemon => {
        const types = pokemon.types.map(type => type.type.name);
        const primaryType = types[0]; // Pega a cor do tipo principal 
        const pokemonCard = document.createElement('div');
        
        // Adiciona a classe base do card
        pokemonCard.classList.add('pokemon-card');
        // Aplica a cor de fundo de acordo com o tipo principal
        pokemonCard.style.backgroundColor = typeColors[primaryType];
        // Insere o conteúdo do card com o nome, imagem e tipos
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>#${pokemon.id}</p>
            ${types.map(type => `<span class="type ${type}">${type}</span>`).join('')}
        `;
        // Adiciona um evento de clique para abrir os detalhes do Pokémon
        pokemonCard.addEventListener('click', () => {
            openPokemonDetails(pokemon);
        });
        // Adiciona o card à lista de Pokémon na página
        pokemonList.appendChild(pokemonCard);
    });
}
