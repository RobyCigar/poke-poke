for (( i=150; i<=200; i++ )); do
    curl -o  "$i.svg" "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/$i.svg"
done