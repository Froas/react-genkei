import "./assets/css/App.css";
import { Route, Routes } from "react-router-dom";
import { Counter } from "./components/Counter/Counter";
import { Header } from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import Pokemon from "./components/Pokemon/Pokemon";
import { Blog } from "./components/Blog/Blog";
import { Button } from "./components/Button/Button";
import Card from "./components/Card/Card";
import { ReduxPG } from "./components/ReduxPG/ReduxPG";
import { use } from "./utils";
import { selectPgSlice } from "./components/Card/cardSlice";
import * as R from "ramda";

type FC = React.FC;

const App: FC = () => {
  const data = use(selectPgSlice);

  const animeToURL = (title: string) =>
    title.toLocaleLowerCase().split(" ").join("-")

  console.log(
    <Route
      path="card/yakusoku-no-neverland-2nd-season-(dub)"
      element={<div>Naruto3</div>}
    />
  );

  return (
    <Routes>
      <Route path="/*" element={<Header />}>
        <Route path="counter" element={<Counter />} />
        <Route path="todo" element={<Todo />} />
        <Route path="pokemon" element={<Pokemon />} />
        <Route path="blog" element={<Blog />} />
        <Route path="button" element={<Button />} />
        <Route path="card" element={<Card />} />
        <Route
          path="card/higurashi-no-naku-koro-ni-sotsu"
          element={<div>Naruto</div>}
        />
        <Route
          path="card/b:-the-beginning-succession"
          element={<div>Naruto2</div>}
        />
        <Route
          path="card/yakusoku-no-neverland-2nd-season-(dub)"
          element={<div>Naruto3</div>}
        />

        {R.map(
          (curr) => (
            <Route
              path={"card/" + animeToURL(encodeURI(curr.title))}
              element={<div>Narutooooooooooooooooooo</div>}
            />
          ),
          data.animeData
        )}
        <Route path="redux-pg" element={<ReduxPG />} />
      </Route>
    </Routes>
  );
};

export default App;
