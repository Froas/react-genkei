import { useEffect, useState } from "react";
import axios from "axios";
import * as R from "ramda";
import "../../assets/css/App.css";

const Pokemon: React.FC = () => {
  type Pokemon = {
    name: string;
    img: string;
    hp: number;
    weight: number;
    first_abilities: string;
    second_abilities: string;
  };

  const [post, setPost] = useState<Object>({});
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonNameButton, setPokemonNameButton] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon>({
    name: "",
    img: "",
    hp: 0,
    weight: 0,
    first_abilities: "",
    second_abilities: "",
  });
  const [search, setSearch] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    const poken = async () => {
      const resp = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((res) => {
          setPost(res.data);
          setPokemonData({
            // name: R.head(res.data.forms)?.name,
            // img: res.data.sprites.front_default,
            // hp: R.head(res.data.stats)?.base_stat,
            // weight: res.data.weight,
            // first_abilities: R.head(res.data.abilities)?.ability.name,
            // second_abilities: R.head(R.tail(res.data.abilities))?.ability.name
            name: res.data.forms[0].name,
            img: res.data.sprites.front_default,
            hp: res.data.stats[0].base_stat,
            weight: res.data.weight,
            first_abilities: res.data.abilities[0].ability.name,
            second_abilities: res.data.abilities[1].ability.name,
          });
        })
        .catch((err) => {
          console.log(err);
          setErr(true);
        });
    };
    poken();
  }, [pokemonNameButton]);

  const clickPokemonHandler = () => {
    setPokemonNameButton(pokemonName);
    setSearch(true);
    setErr(false);
  };
  const onChangePokemonHandler = (e: React.FormEvent<HTMLInputElement>) =>
    setPokemonName(e.currentTarget.value);

  const onKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setPokemonNameButton(pokemonName);
    }
  };
  err === true;

  return (
    <div>
      <div className="Pokemon-header">
        <h1>Pokemon</h1>
        <input onKeyDown={onKeydownHandler} onChange={onChangePokemonHandler} />
        <button className="PokemonBotton" onClick={clickPokemonHandler}>
          Search
        </button>
      </div>
      {err === true ? (
        <p className="Pokemon-info">Please write a pokemon name correctly</p>
      ) : search === true ? (
        <div className="Pokemon-info">
          <h1>{pokemonData.name}</h1>
          <img src={pokemonData.img} />
          <p>HP: {pokemonData.hp}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>First ability: {pokemonData.first_abilities}</p>
          <p>Second ability: {pokemonData.second_abilities}</p>
        </div>
      ) : (
        <p className="Pokemon-info">Choose your pokemon</p>
      )}
    </div>
  );
};

export default Pokemon;
