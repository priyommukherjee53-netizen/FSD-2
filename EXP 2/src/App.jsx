import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import FilteredPosts from "./components/FilteredPosts";

function App() {
  return (
    <div className="container py-5">

      <h1 className="text-center text-primary fw-bold mb-5">
        Redux Toolkit Dashboard
      </h1>

      <AddPost />

      <hr className="my-5"/>

      <PostList />

      <hr className="my-5"/>

      <FilteredPosts />

    </div>
  );
}

export default App;