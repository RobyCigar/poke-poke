# Poke2, Simple Pokemon Fetcher


# Instalasi


`npm run dev`


# Step2 pengerjaan


1. Data Source: 
-   Ambil data raw csv di https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv

2. Image Source:
-   Ambil gambar pake curl, biar gk kena rate limit, jangan ambil 200 imagesnya, tapi per batch


```
    for (( i=1; i<=50; i++ )); do\n    curl -o  "$i.svg" "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/$i.svg"\ndone

```