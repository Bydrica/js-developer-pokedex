const pokemonList = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('load-more');
let offset = 0;
const limit = 9; // Número de Pokémon a serem carregados por vez
// Função para buscar Pokémon da PokéAPI
async function fetchPokemons(offset, limit) {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  const promises = data.results.map(async (pokemon) => {
    const response = await fetch(pokemon.url);
    return await response.json();
  });
  const pokemonDetails = await Promise.all(promises);
  renderPokemons(pokemonDetails);
}
// Função para renderizar os Pokémon na lista
function renderPokemons(pokemons) {
  pokemons.forEach(pokemon => {
    const types = pokemon.types.map(type => type.type.name);
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>#${pokemon.id}</p>
            ${types.map(type => `<span class="type ${type}">${type}</span>`).join('')}
        `;
    pokemonCard.addEventListener('click', () => {
      openPokemonDetails(pokemon);
    });
    pokemonList.appendChild(pokemonCard);
  });
}
// Função para carregar mais Pokémon ao clicar no botão
loadMoreButton.addEventListener('click', () => {
  offset += limit;
  fetchPokemons(offset, limit);
});
// Função para abrir detalhes de um Pokémon
function openPokemonDetails(pokemon) {
  window.location.href = `pokemon.html?id=${pokemon.id}`;
}
// Carrega os primeiros Pokémon ao iniciar a página
fetchPokemons(offset, limit);