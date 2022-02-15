import "../../assets/css/Blog.css";
import * as R from "ramda";

export const Blog = () => {
  const blogData = {
    blogs: [
      { title: "anime", text: "Anime was a mistake", descr: "smt1" },
      { title: "manga", text: "Manga was a mistake", descr: "smt2" },
      { title: "henta", text: "Anime was a mistake", descr: "smt3" },
    ],
  };
  return (
    <div>
      <h1>{R.find(R.propEq("title", "anime"))(blogData.blogs)?.title}</h1>
      <p>{R.head(R.tail(blogData.blogs))?.text}</p>
      <p>{R.last(blogData.blogs)?.descr}</p>
    </div>
  );
};
