export type Rating =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "";

export type Anime = {
  title: string;
  img: string;
  name: string;
  id: string;
};

const exAnime: Anime = {
  title: "",
  img: "",
  name: "",
  id: "",
};

export type CardFormProps = {
  anime: AnimeWithRating[];
  animeTitle: string;
  animeName: string;
  animeRating: Rating;
  setAnime: (anime: AnimeWithRating[]) => void;
  setAnimeName: (animeName: string) => void;
  setAnimeTitle: (animeTitle: string) => void;
  setAnimeRating: (animeRating: Rating) => void
};


const animeRating: Rating = "0";

const a = { ...exAnime, animeRating };

export type AnimeWithRating = Anime & { rating: Rating };
