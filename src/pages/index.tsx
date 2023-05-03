import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151offset=0')
      .then(res => {
        const urlFetches = res.data.results.map(pokemon => {
          return axios.get(pokemon.url).then(res => res.data)
        })

        Promise.all(urlFetches)
          .then(res => {
            setPokemons(res)
          })
      })
      .catch(err => console.log(err))
})

  return(
    <div className='flex flex-col items-center'>
      <h1>Pokedex</h1>
      <div className='grid grid-cols-5 gap-1'>
        {pokemons.map(pokemon => {
          return(
            <div key={pokemon.name} className='w-24 h-32 hover:scale-125 bg-red-600 flex flex-col items-center justify-between overflow-hidden rounded-sm'>
              <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} className='h-24' />
              <h2 className='bg-slate-100 w-24 flex justify-center'>{pokemon.name}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}
