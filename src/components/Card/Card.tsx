import { useState, useEffect } from "react";
import "../../assets/css/Card.scss";
import * as R from "ramda";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

type Rating = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "";

type Card = {
  id: string;
  rating: Rating;
  title: string;
  name: string;
};

type Anime = {
  title: string,
  img: string,
  name: string
}

const MKCard: React.FC<Card> = (props): JSX.Element => {
  return (
    <div className="Card">
      <h1>
        {props.name.length > 10 ? props.name.slice(0, 9) + "..." : props.name}
      </h1>
      <p>
        {props.title.length > 10
          ? props.title.slice(0, 9) + "..."
          : props.title}
      </p>
      <p>{props.rating + "/10"}</p>
    </div>
  );
};

const Card: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [img, setImg] = useState<string>("")
  const [mkCard, setMkCard] = useState<Card>({
    id: uuidv4(),
    rating: "",
    title: "",
    name: "",
  });

  const data: Card[] = [
    { id: uuidv4(), rating: "8", title: "Title", name: "Anime" },
    { id: uuidv4(), rating: "0", title: "Huynya", name: "Hanime" },
    { id: uuidv4(), rating: "1", title: "Netu", name: "Hleb" },
    { id: uuidv4(), rating: "5", title: "Norm", name: "One Peace" },
    { id: uuidv4(), rating: "10", title: "Norm", name: "Bleach" },
    { id: uuidv4(), rating: "0", title: "Pizdes", name: "Naruto" },
  ];

  const [datas, setDatas] = useState<Card[]>(data);

  const filteredCards = R.filter(
    (card) =>
      card.name.includes(search) ||
      card.rating.includes(search) ||
      card.title.includes(search),
    datas
  );


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
          const filter = R.filter((anime: Anime) => 
            anime.title.includes(search),
            data
          )
          setImg(filter[0].img)
          console.log(filter)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    response();
  }, [search]);


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
            mkCard.name.length > 0 && mkCard.title.length > 0
              ? (setDatas(R.concat([mkCard], datas)),
                setMkCard({
                  id: uuidv4(),
                  rating: "0",
                  title: "",
                  name: "",
                }))
              : console.log("enter name")
          )}
        >
          <input
            className="InputCard"
            placeholder="Name"
            type="text"
            value={mkCard.name}
            onChange={(e) => setMkCard(R.assoc("name", e.target.value, mkCard))}
          />
          <input
            className="InputCard"
            placeholder="Title"
            type="text"
            value={mkCard.title}
            onChange={(e) =>
              setMkCard(R.assoc("title", e.target.value, mkCard))
            }
          />
          <input
            className="InputCard"
            placeholder="Rating"
            type="text"
            value={mkCard.rating}
            onChange={(e) =>
                parseInt(e.target.value) >= 0
                ? setMkCard(R.assoc("rating", e.target.value as Rating, mkCard))
                : (console.log("write a number"), setMkCard(R.assoc("rating", "" as Rating, mkCard)))
            }
          />
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
                id={curr.id}
                key={curr.id + curr.rating}
                name={curr.name}
                rating={curr.rating}
                title={curr.title}
              />
              <button
                className="ButtonCard"
                type="submit"
                onClick={() =>
                  setDatas(R.filter((data) => data.id !== curr.id, datas))
                }
              >
                Delete
              </button>
            </div>
          ),
          filteredCards
        )}
        <img src={img}/>
      </div>
    </div>
  );
};

export default Card;
