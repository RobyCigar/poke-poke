# Poke2, Simple Pokemon Fetcher

## Requirements
    Software yang diperlukan

    1. Nodejs versi 20+ & npm

## Instalasi Development

### Instalasi Frontend React 
1. Install dependensi
```
npm install
```
2. Jalankan di env local

npm run dev

3. Kalo mau run di production

```
npm run build
```


### Instalasi Backend Nodejs

1. Pindah ke directory backend
```
cd backend
```
2. Install package

```
npm install
```

3. Jalankan server, nanti server bakal running di port 3000

```
npm run dev
```

## Langkah-langkah Pengerjaan


1. Data Source: 
-   Ambil data raw csv di https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv
-   Parsingnya pake bash script saja utk mendapatkan data yg diinginkan
-   Misal `cat data.csv | grep blablabla`

2. Image Source:
-   Ambil gambar pake curl, biar gk kena rate limit, jangan ambil 200 imagesnya, tapi per batch
-   Untuk gambar saya pake di link url berikut yang dream world


```
for (( i=200; i<=250; i++ )); do
    curl -o  "$i.svg" "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/$i.svg"
done
```