import React, { useState, useEffect } from 'react'
import api from './lib/api'
import { CardHeader, Card, CardContent } from './components/ui/card';

function App() {
  const [pokemon, setPokemon] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/pokemons")
      setPokemon(response.data)
    } 
    fetchData()
  }, [])

  if(pokemon.length == 0) {
    return (
      <h1>
        Loading...
      </h1>
    )
  }
  return (
    <div className='grid grid-cols-3 gap-4'>
      {
        pokemon.map(it => {
          return (
            <Card>
        <CardHeader>
          {it?.identifier}
        </CardHeader>
        <CardContent>
          <img className='w-full' src={`/pokemon/${it.id}.svg`}/>
        </CardContent>
      </Card>
          )
        })
      }
    </div>
  )
}

export default App