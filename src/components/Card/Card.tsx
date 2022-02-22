import { useState, useEffect } from "react";
import "../../assets/css/Card.scss";
import * as R from "ramda";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { MKCard } from "./MkCard";
import { CardForm } from "./CardForm";
import { AnimeWithRating, Rating } from "./TypesCard";
import { useDispatch } from "react-redux";
import { setAnime, selectPgSlice, setSearch } from "./cardSlice";
import { use } from "../../utils";
import { Link } from "react-router-dom";

export const Card: React.FC = () => {
  const dispatch = useDispatch();
  const data = use(selectPgSlice);
 

  const randomNumber = () => Math.floor(Math.random() * 10).toString();
  const animeToURL = (title: string) =>
    title.toLocaleLowerCase().split(" ").join("-");

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
          const anime: AnimeWithRating[] = R.map(
            (curr) => ({ ...curr, rating: randomNumber(), id: uuidv4() }),
            data
          );
          dispatch(setAnime(anime));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    response();
  }, []);

  const filteredCards = R.filter(
    (card) =>
      card.name.includes(data.search) ||
      card.rating.includes(data.search) ||
      card.title.includes(data.search),
    data.animeData
  );
  return (
    <div>
      <div className="SearchConteiner">
        <input
          className="SearchCard"
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setSearch(e.target.value))
          }
        />
      </div>
      <CardForm/>
      <div className="CardContainer">
        {R.map(
          (curr) => (
            <div className="CardsContainer" key={curr.id}>
            <Link to={`${animeToURL(curr.title)}`} className="CardLink">
              <MKCard
                id={curr.id}
                name={curr.name}
                rating={curr.rating}
                title={curr.title}
                img={curr.img}
              />
              </Link>
              <button
                className="ButtonCard"
                type="submit"
                onClick={() =>
                  dispatch(
                    setAnime(
                      R.filter((data) => data.img !== curr.img, data.animeData)
                    )
                  )
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
