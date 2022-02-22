import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppSelector, selector } from "../../utils";
import { v4 as uuidv4 } from "uuid";
import { AnimeWithRating, Rating } from "./TypesCard";

type CardSlice = {
  search: string;
  name: string;
  title: string;
  rating: Rating;
  animeData: AnimeWithRating[];
};

const initialState: CardSlice = {
  search: "",
  name: "",
  title: "",
  rating: "",
  animeData: [
    {
      title: "Kimetsu no Yaiba: Yuukaku-hen",
      img: "https://cdn.myanimelist.net/images/anime/1338/111945l.jpg",
      name: "top",
      id: uuidv4(),
      rating: "10",
    },
  ],
};

export const cardSlice = createSlice({
  name: "cardSlice",
  initialState,
  reducers: {
    setAnime: (state, action: PayloadAction<AnimeWithRating[]>) => {
      state.animeData = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setRating: (state, action: PayloadAction<Rating>) => {
      state.rating = action.payload;
    },

  },
});

export const selectPgSlice: AppSelector<CardSlice> = selector(
  (state) => state.reduxCardreducer
);

export const { setAnime, setSearch, setRating, setName, setTitle } =
  cardSlice.actions;
