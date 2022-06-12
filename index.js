const page = document.querySelector("#pokedex-page")

fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    .then(response => {
        return response.json() // converte a response em um json
    })
    .then(async data => {
        const box = document.querySelector("#pokemon-box")
        // remove o conteúdo hardcoded da página
        page.innerHTML = "" 

        for (let i = 0; i < data.results.length; i++) {
            // editando o nome
            let pokemonNome = data.results[i].name
            box.querySelector("#pokemon-name").innerHTML = pokemonNome
            box.querySelector("#pokemon-name").style.textTransform = "capitalize" // coloca a primeira letra maiúscula
            
            // edita a imagem do pokemon
            const pokemonForm = await fetch("https://pokeapi.co/api/v2/pokemon-form/" + pokemonNome) // chama a api pra pegar a url
            const form = await pokemonForm.json() // espera a pokemonImage ser convertida em json
            box.querySelector("#pokemon-img").src = form.sprites.front_default // altera a url do elemento pra url de imagem do pokemon
            
            // adicionando o tipo dos pokemons
            const p = box.querySelector(".pokemon-type")
            const types = form.types

            if (types.length > 1) {
                p.innerHTML = `${types[0].type.name}, ${types[1].type.name}`
            } else {
                p.innerHTML = `${types[0].type.name}`
            }
            p.style.textTransform = "capitalize"
            

            page.innerHTML += box.outerHTML // converte a variavel box pra string
            console.log(types)
            
        }
    })