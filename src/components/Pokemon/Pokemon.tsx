import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/css/Pokemon.scss";

const Pokemon: React.FC = () => {
  type Pokemon = {
    name: string;
    img: string;
    hp: number;
    weight: number;
    first_abilities: string;
    second_abilities: string;
  };

  const [pokemonName, setPokemonName] = useState<string>("");
  const [chosePokemon, setChosePokemon] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon>({
    name: "",
    img: "",
    hp: 0,
    weight: 0,
    first_abilities: "",
    second_abilities: "",
  });

  useEffect(() => {
    const response = async () => {
      const resp = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((res) => {
          const data = res.data;
          console.log(data);
          setPokemonData({
            name: res.data.forms[0].name,
            img: res.data.sprites.front_default,
            hp: res.data.stats[0].base_stat,
            weight: res.data.weight,
            first_abilities: res.data.abilities[0].ability.name,
            second_abilities: res.data.abilities[1].ability.name,
          });
          console.log(pokemonData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    response();
  }, [chosePokemon]);

  return (
    <div className="PokemonContainer">
      <div className="PokemonContainer">
        <h1>Enter Pokemon Name</h1>
        <input
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPokemonName(e.currentTarget.value)
          }
        ></input>
        <button onClick={() => setChosePokemon(pokemonName)}>press</button>
      </div>

      <div className="PokemonContainer">
        <h1>{pokemonData.name}</h1>
        <img src={pokemonData.img} />
        <p>HP: {pokemonData.hp}</p>
        <p>Weight: {pokemonData.weight}</p>
        <p>First ability: {pokemonData.first_abilities}</p>
        <p>Second ability: {pokemonData.second_abilities}</p>
      </div>
    </div>
  );
};

export default Pokemon;
