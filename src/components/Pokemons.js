import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Pokemons = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=50/');
            const results = response.data.results;
            const pokemonWithImages = await Promise.all(results.map(async (pokemon) => {
                const data = await getPokemonData(pokemon.url);
                console.log(data);
                return {
                    name: pokemon.name,
                    imageUrl: data.sprites.front_default
                };
            }));
            setData(pokemonWithImages);
        };
        fetchData();
    }, []);

    const getPokemonData = async (url) => {
        const response = await axios.get(url);
        return response.data;
    };

    return (
        <div className="container">
            <h1 className="text-center main-title">Pokemons:</h1>
            <div className="row">
                {data.map((pokemon, index) => (
                    <div key={index} className="col-md-3 col-xl-2 col-lg-3 mb-3">
                        <div className="pokemon-card card-bg">
                            <div className="card-body">
                                <p className="card-text text-center text-capitalize">{pokemon.name}</p>
                            </div>
                            <img src={pokemon.imageUrl} className="card-img-bottom" alt={pokemon.name}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pokemons;
