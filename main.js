const pokemonHtml = document.querySelector('.pokemon');
const pagerHtml = document.querySelector('.pager');
const btnPrevious = pagerHtml.querySelector(".btn-previous");
const btnNext = pagerHtml.querySelector(".btn-next");
const modal = document.getElementById('pokemonModal');
const closeButton = modal.querySelector('.close-button');

function showPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('modalPokemonName').textContent = data.name;
            document.getElementById('modalPokemonHeight').textContent = data.height;
            document.getElementById('modalPokemonWeight').textContent = data.weight;

            
            const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
            document.getElementById('modalPokemonAbilities').textContent = abilities;

            
            const types = data.types.map(type => type.type.name).join(', ');
            document.getElementById('modalPokemonTypes').textContent = types;

            
            const audioSrc = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`;
            document.getElementById('modalPokemonCries').innerHTML = `
                <audio controls>
                    <source src="${audioSrc}" type="audio/ogg">
                    Votre navigateur ne prend pas en charge la balise audio.
                </audio>
            `;

            document.getElementById('modalPokemonSprite').src = data.sprites.front_default;

            modal.style.display = 'block';
        })
}

pokemonHtml.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const url = event.target.getAttribute('data-url');
        showPokemonDetails(url);
    }
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

function fetchPokemons(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        pokemonHtml.innerHTML = '';

        data.results.forEach(result => {
            pokemonHtml.innerHTML += `<li><button data-url="${result.url}">${result.name}</button></li>`;
        });
    
        btnPrevious.setAttribute('data-url', data.previous);
        btnNext.setAttribute('data-url', data.next);
    });
}

fetchPokemons('https://pokeapi.co/api/v2/pokemon');

btnPrevious.addEventListener('click', () => {
    const url = btnPrevious.getAttribute('data-url');

    if(url != 'null'){
        fetchPokemons(url);
    }

});

btnNext.addEventListener('click', () => {
    const url = btnNext.getAttribute('data-url');

    if(url){
        fetchPokemons(url);
    }

});