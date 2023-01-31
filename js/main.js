const pokemonContainer = document.querySelector(".pokemon-container");
const pokemonModal = document.querySelector(".pokemon-modal");

const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");

const next = document.querySelector("#next");
const more = document.querySelector("#more");

const moredamage = document.querySelector("#moredamage");
const moredefence = document.querySelector("#moredefence");

let limit = 8;
let offset = 1;

moredamage.addEventListener("click", () => {
  json.sort(function(a, b) {
    return a.damage - b.damage;
  });
  fetchPokemons(offset, limit);
});

moredefence.addEventListener("click", () => {
  json.sort(function(a, b) {
    return a.defence - b.defence;
  }); 
  fetchPokemons(offset, limit);
});


previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 8;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 8;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

more.addEventListener("click", () => {
  offset += 8;
  fetchPokemons(offset, limit);
});


function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
      spinner.style.display = "none";
    });
}

function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i < offset + limit; i++) {
    fetchPokemon(i);
  }
}


function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);

  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");
  spriteContainer.classList.add("img-size");

  const sprite = document.createElement("img");
  sprite.classList.add("img-size");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);
  card.appendChild(spriteContainer);

  const cardBack = document.createElement("div");
  cardBack.classList.add("pokemon-block-back");

  cardBack.appendChild(progressBars(pokemon.stats));

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  
  const infoPokemon = document.createElement("div");
  infoPokemon.classList.add("name");

  const linkPokemon = document.createElement("button");
  linkPokemon.classList.add("btn");
  linkPokemon.classList.add("color-change");

  linkPokemon.id = `${pokemon.id}`;

  linkPokemon.textContent = `${pokemon.name} #${pokemon.id.toString().padStart(3, 0)}`;
  
  infoPokemon.appendChild(linkPokemon);
  flipCard.appendChild(infoPokemon);

  pokemonContainer.appendChild(flipCard);

function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 6; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress-pokemon");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-pokemon-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  const statContainer = document.createElement("stat-container");
  statContainer.classList.add("stat-container");

  const statName = document.createElement("a");
  statName.classList.add("btn");
  statName.classList.add("btn-primary");
  statName.classList.add("btn-sm");

  statName.setAttribute("href", '');

  statName.textContent = 'Caught';

  statContainer.appendChild(statName);
  statsContainer.appendChild(statContainer);

  return statsContainer;
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);
