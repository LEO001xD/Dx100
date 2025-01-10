document.getElementById("searchBar").addEventListener("submit", function(event) {
    event.preventDefault();
    fetchData(); 
});

async function fetchData(){
    try{
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        console.log(data);
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        const stats = data.stats.map(stat => {
            return `${stat.stat.name}: ${stat.base_stat}`;
        });

        const statsElement = document.getElementById("pokemonStats");
        statsElement.innerHTML = stats.map(stat => `<p>${stat}</p>`).join("");

        const nameElement = document.getElementById("pokemonNameDisplay");
        nameElement.textContent = data.name;

        const types = data.types.map(type => type.type.name).join(", ");
        const typeElement = document.getElementById("pokemonTypeDisplay");
        typeElement.textContent = `POKEMON TYPE: ${types}`;

    }
    catch(error){
        console.error(error);
    }
}

