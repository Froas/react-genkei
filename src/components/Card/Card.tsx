import { useState, useEffect } from "react";
import "../../assets/css/Card.scss";
import * as R from "ramda";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

type Rating = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "";

type Anime = {
  title: string,
  img: string,
  name: string
  id: string
}

const MKCard: React.FC<Anime> = ({name, title, img, id}): JSX.Element => {
  return (
    <div className="Card">
      <h1>
        {title.length > 10 ? title.slice(0, 9) + "...": title}

      </h1>
      <p>
        {name.length > 10 ? name.slice(0, 9) + "..." : name}
      </p>
      <img src={img} className="CardImg"/>
    </div>
  );
};

const Card: React.FC = () => {
  const [anime, setAnime] = useState<Anime[]>([])
  const [search, setSearch] = useState<string>("")
  const [animeName, setAnimeName] = useState<string>("")
  const [animeTitle, setAnimeTitle] = useState<string>("")


  useEffect(() => {
    const response = async () => {
      const resp = await axios
        .get('https://animes3.p.rapidapi.com/', {
        headers: {
          'x-rapidapi-host': 'animes3.p.rapidapi.com',
          'x-rapidapi-key': '05f9ed2c14msh06a69e9030366bfp1d0337jsn2b23cc655923'}
        })
        .then((res) => {
          const data = res.data;
          setAnime(data)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    response();
  }, []);

  console.log(anime)

  const filteredCards = R.filter(
    (card) =>
      card.name.includes(search) ||
      // card.rating.includes(search) ||
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
      <div>
        <form
          className="CreateCard"
          onSubmit={(e) => (
            e.preventDefault(),
            animeName.length > 0 && animeTitle.length > 0 
              ? ((setAnime(R.concat(anime,[
                {name: animeName, 
                  title: animeTitle, 
                  id: uuidv4(), 
                  img: ""}]))),
               console.log(anime),
               setAnimeName(""),
               setAnimeTitle("")
              )
              : console.log("enter name")
          )}
        >
          <input
            className="InputCard"
            placeholder="Name"
            type="text"
            value={animeName}
            onChange = {(e: React.FormEvent<HTMLInputElement>) => 
              {setAnimeName(e.currentTarget.value)}}
          />
          <input
            className="InputCard"
            placeholder="Title"
            type="text"
            value={animeTitle}
            onChange = {(e: React.FormEvent<HTMLInputElement>) => 
              {setAnimeTitle(e.currentTarget.value)}}
          />
          {/* <input
            className="InputCard"
            placeholder="Rating"
            type="text"
            value=""
            // onChange={}
          /> */}
          <button type="submit" className="ButtonAdd">
            Add
          </button>
        </form>
      </div>
      <div className="CardContainer">
        {R.map(
          (curr) => (
            <div className="CardsContainer">
              <MKCard
                id={uuidv4()}
                key={uuidv4()}
                name={curr.name}
                // rating={curr.rating}
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


// 1. исправить код 
// 2. Использовать массив Аниме в логике 
// 3. Поставить на фон карточки картинку(React.CSSProperties style={})


