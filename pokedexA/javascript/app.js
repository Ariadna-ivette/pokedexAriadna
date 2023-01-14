(() => {
  const URL_API = "https://pokeapi.co/api/v2/pokemon/";
  const URL_IMG_POKEMON =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  const MAX = 900;
  const MIN = 1;
  const pokeImagen = document.querySelector("#img-pokemon");
  const pokeNombre = document.querySelector("#pokemon-name");
  const pokeId = document.querySelector("#pokemon-id");
  const pokeAtaque = document.querySelector("#poke-ataque");
  const pokeDefensa = document.querySelector("#poke-defensa");
  let id = 1;
  let temporizador = setInterval(() => fetchData(), 10000);

  document
    .querySelector("#mostrar-pokemon")
    .addEventListener("click", obtenerPokemon);

  let getRandomInt = () => {
    return Math.floor(Math.random() * (MAX - MIN)) + MIN;
  }

  const fetchData = async () => {
    try {
      console.log(id);
      id = getRandomInt();
      const res = await fetch(`${URL_API}${id}`);
      const data = await res.json();

      console.log(data);

      const pokemon = {
        id: `#${id}`,
        img: `${URL_IMG_POKEMON}${data.id}.png`,
        nombre: data.name,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
      };

      pintarCard(pokemon);
    } catch (error) {
      console.log(error);
    }
  };

  function obtenerPokemon() {
    clearInterval(temporizador);
    console.log("Aquí está un Pokemón nuevo");
    fetchData();
    temporizador = setInterval(() => fetchData(), 30000);
  }

  const pintarCard = (pokemon) => {
    pokeNombre.innerText = pokemon.nombre;
    pokeId.innerText = pokemon.id;
    pokeAtaque.innerText = pokemon.ataque;
    pokeDefensa.innerText = pokemon.defensa;
    pokeImagen.src = pokemon.img;
  };

  fetchData();
})();
