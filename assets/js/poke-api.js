const baseUrl = 'https://pokeapi.co'

const pokeApi = {
  getPokemons: async(offset = 0, limit = 5) => {
    const url = `${baseUrl}/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return await fetch(url)
        .then(async(resp) => {
            const data = await resp.json()
            const pokemons = data.results
            return pokemons.map(async(pokemon)=> {
                return await fetch(pokemon.url)
                    .then(async(resp) => {
                        const pokemonDetail = await resp.json()

                        const pokemon = new Pokemon()
                        pokemon.number = pokemonDetail.id
                        pokemon.name = pokemonDetail.name

     
                        pokemonDetail.types.map( typeSlot => {
                            pokemon.types.push(typeSlot.type.name)
                        })
                        
                        pokemon.type = pokemonDetail.types[0].type.name

                        pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

                        return pokemon
                    })
                    
            })
            
        })
    }
}
