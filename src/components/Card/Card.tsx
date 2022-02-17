import { useState, useEffect } from "react";
import "../../assets/css/Card.scss";
import * as R from "ramda";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { MKCard } from "./MkCard";
import { CardForm } from "./CardForm";
import { AnimeWithRating, Rating } from "./TypesCard";

const Card: React.FC = () => {
  const [anime, setAnime] = useState<AnimeWithRating[]>([]);
  const [search, setSearch] = useState<string>("");
  const [animeName, setAnimeName] = useState<string>("");
  const [animeTitle, setAnimeTitle] = useState<string>("");
  const [animeRating, setAnimeRating] = useState<Rating>("");

  const randomNumber = () => Math.floor(Math.random() * 10).toString();
  console.log(randomNumber());

  useEffect(() => {
    const response = async () => {
      const resp = await axios
        .get("https://animes3.p.rapidapi.com/", {
          headers: {
            "x-rapidapi-host": "animes3.p.rapidapi.com",
            "x-rapidapi-key":
              "05f9ed2c14msh06a69e9030366bfp1d0337jsn2b23cc655923",
          },
        })
        .then((res) => {
          const data = res.data;
          const dataWithRating = R.map(
            (curr) => ({ ...curr, rating: randomNumber() }),
            data
          );
          const dataWithId = R.map((curr) => ({ ...curr, id: uuidv4() }), dataWithRating);

          setAnime(dataWithId);
          console.log(dataWithId);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    response();
  }, []);

  const filteredCards = R.filter(
    (card) =>
      card.name.includes(search) ||
      card.rating.includes(search) ||
      card.title.includes(search),
    anime
  );

  return (
    <div>
      <div className="SearchConteiner">
        <input
          className="SearchCard"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CardForm
        anime={anime}
        animeName={animeName}
        animeTitle={animeTitle}
        setAnime={setAnime}
        setAnimeName={setAnimeName}
        setAnimeTitle={setAnimeTitle}
        animeRating={animeRating}
        setAnimeRating={setAnimeRating}
      />
      <div className="CardContainer">
        {R.map(
          (curr) => (
            <div className="CardsContainer" key={curr.id}>
              <MKCard
                id={curr.id}
                name={curr.name}
                rating={curr.rating}
                title={curr.title}
                img={curr.img}
              />
              <button
                className="ButtonCard"
                type="submit"
                onClick={() =>
                  setAnime(R.filter((data) => data.img !== curr.img, anime))
                }
              >
                Delete
              </button>
            </div>
          ),
          filteredCards
        )}
      </div>
    </div>
  );
};

export default Card;
