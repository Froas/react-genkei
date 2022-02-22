import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Rating } from "./TypesCard";
import {
  setAnime,
  selectPgSlice,
  setRating,
  setName,
  setTitle,
} from "./cardSlice";
import { use } from "../../utils";
import * as R from "ramda"

export const CardForm: React.FC = () => {
  const data = use(selectPgSlice);
  const dispatch = useDispatch();

  return (
    <div>
      <form
        className="CreateCard"
        onSubmit={(e) => (
          e.preventDefault(),
          data.name.length > 0 && data.title.length > 0
            ? (dispatch(
              setAnime(
                  R.concat(
                    data.animeData,
                  [
                  {
                    name: data.name,
                    title: data.title,
                    id: uuidv4(),
                    img: "",
                    rating: data.rating,
                  },
                ])
                
                )
              ),
              dispatch(setName("")),
              dispatch(setTitle("")),
              dispatch(setRating("")))
            : {}
        )}
      >
        <input
          className="InputCard"
          placeholder="Name"
          type="text"
          value={data.title}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(setTitle(e.currentTarget.value));
          }}
        />
        <input
          className="InputCard"
          placeholder="Title"
          type="text"
          value={data.name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(setName(e.currentTarget.value));
          }}
        />
        <input
          className="InputCard"
          placeholder="Rating"
          type="text"
          value={data.rating}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(setRating(e.currentTarget.value as Rating));
          }}
        />
        <button type="submit" className="ButtonAdd">
          Add
        </button>
      </form>
    </div>
  );
};
