async function fetchPokemonList(offset = 0) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    const data = await response.json();
    displayPokemonList(data.results);
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
  }
}

async function fetchPokemonDetail(nameOrId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await response.json();
    displayPokemonDetail(data);
  } catch (error) {
    console.error("Error al obtener el detalle del Pokémon:", error);
    alert("Pokémon no encontrado");
  }
}

function displayPokemonList(pokemonList) {
  const pokemonListContainer = document.getElementById("pokemonList");
  pokemonListContainer.innerHTML = ''; // Limpiar la lista antes de mostrarla

  pokemonList.forEach(pokemon => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("card");

    let pokemonName = pokemon.name;
    pokemonName= pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;

    pokemonCard.innerHTML = `
      <img src="${pokemonImage}" alt="${pokemonName}" />
      <p>${pokemonName}</p>
    `;
    pokemonCard.addEventListener('click', () => fetchPokemonDetail(pokemon.name));
    pokemonListContainer.appendChild(pokemonCard);
  });
}

function displayPokemonDetail(pokemon) {
  const pokemonDetailContainer = document.getElementById("pokemonDetail");
  pokemonDetailContainer.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h3>Tipos</h3>
    <ul>
      ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
    </ul>
    <h3>Habilidades</h3>
    <ul>
      ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
    </ul>
  `;
}

let offset = 0;

document.getElementById('nextBtn').addEventListener('click', () => {
  offset += 10;
  fetchPokemonList(offset);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  offset -= 10;
  fetchPokemonList(offset);
});

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchValue = document.getElementById('search').value.trim().toLowerCase();
  if (searchValue) {
    fetchPokemonDetail(searchValue);
  }
});

function init() {
  fetchPokemonList();
}

document.addEventListener('DOMContentLoaded', init);
