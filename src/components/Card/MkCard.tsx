import React from 'react'
import { Anime }  from './TypesCard';

export const MKCard: React.FC<Anime> = ({name, title, img, id}): JSX.Element => {
  return (
    <div className="Card" style={{backgroundImage: `url(${img})`
    , backgroundRepeat:"no-repeat", backgroundPosition: "center", backgroundSize: "contain"}}>
      <h1 className="AnimeTitle">
        {title}

      </h1>
      <p className="AnimeName">
        {name}
      </p>
    </div>
  );
};

