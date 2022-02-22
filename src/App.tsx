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
  console.log(data.animeData);
  const animeToURL = (title: string) =>
  title.toLocaleLowerCase().split(" ").join("-");
  R.map((curr) => {console.log(`${animeToURL(curr.title)}`)}, data.animeData)
  console.log(<Route path="counter" element={<Counter />} />)
  

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="counter" element={<Counter />} />
        <Route path="todo" element={<Todo />} />
        <Route path="pokemon" element={<Pokemon />} />
        <Route path="blog" element={<Blog />} />
        <Route path="button" element={<Button />} />
        <Route path="card" element={<Card />} />
        <Route path="redux-pg" element={<ReduxPG />} />
        <Route path="card/tensai-ouji-no-akaji-kokka-saisei-jutsu" element={<div>Naruto</div>} />

        {R.map((curr) => {
            <Route path={`http://localhost:3000/card/${animeToURL(curr.title)}`} element={<ReduxPG />} />;
          },
          data.animeData
        )}
      </Route>
    </Routes>
  );
};

export default App;
