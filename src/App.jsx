import React, { useState, useEffect } from 'react'
import api from './lib/api'
import { CardHeader, Card, CardContent } from './components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"


function App() {
  const [pokemon, setPokemon] = useState([])
    const [weight, setWeight] = useState("all");

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
    <div>
      <img src='/huhuhu.png' className='mx-auto' />

    <Select onValueChange={(val) => {
      setWeight(val)
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Pilih Berdasarkan Berat" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pilih Size</SelectLabel>
          <SelectItem value="all">Semua</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="heavy">Heavy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
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

          Weight: 
          <Badge>
            {it?.weight} Kg
          </Badge>
        </CardContent>
      </Card>
          )
        })
      }
    </div>
    </div>
  )
}

export default App