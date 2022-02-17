import React from "react";
import { AnimeWithRating } from "./TypesCard";

export const MKCard: React.FC<AnimeWithRating> = ({
  name,
  title,
  img,
  rating,
}): JSX.Element => {
  return (
    <div
      className="Card"
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <h1 className="AnimeTitle">{title}</h1>
      <p className="AnimeName">{name}</p>
      <p className="AnimeRating">{rating}/10</p>
    </div>
  );
};
