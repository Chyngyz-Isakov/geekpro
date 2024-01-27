import React, { useState, useEffect } from 'react';
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
        </div>
    );
};

export default Pokemons;
