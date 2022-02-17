import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardFormProps, Rating } from "./TypesCard";
import * as R from "ramda";

export const CardForm: React.FC<CardFormProps> = (props) => {
  return (
    <div>
      <form
        className="CreateCard"
        onSubmit={(e) => (
          e.preventDefault(),
          props.animeName.length > 0 && props.animeTitle.length > 0
            ? (props.setAnime(
                R.concat(props.anime, [
                  {
                    name: props.animeName,
                    title: props.animeTitle,
                    id: uuidv4(),
                    img: "",
                    rating: props.animeRating
                  },
                ])
              ),
              props.setAnimeName(""),
              props.setAnimeTitle(""),
              props.setAnimeRating(""))
            : {}
        )}
      >
        <input
          className="InputCard"
          placeholder="Name"
          type="text"
          value={props.animeTitle}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            props.setAnimeTitle(e.currentTarget.value);
          }}
        />
        <input
          className="InputCard"
          placeholder="Title"
          type="text"
          value={props.animeName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            props.setAnimeName(e.currentTarget.value);
          }}
        />
        <input
          className="InputCard"
          placeholder="Rating"
          type="text"
          value={props.animeRating}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            props.setAnimeRating(e.currentTarget.value as Rating);
          }}
        />
        <button type="submit" className="ButtonAdd">
          Add
        </button>
      </form>
    </div>
  );
};
