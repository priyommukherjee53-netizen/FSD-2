import "./App.css";

import AddPost from "./components/AddPost";
import Counter from "./components/Counter";
import PostList from "./components/PostList";
import FilteredPosts from "./components/FilteredPosts";

function App() {
  return (
    <div className="App">
      <h1>Redux Performance Optimization</h1>

      <AddPost />

      <hr />

      <div className="section">
        <Counter />
      </div>

      <hr />

      <div className="section">
        <PostList />
      </div>

      <hr />

      <div className="section">
        <FilteredPosts />
      </div>
    </div>
  );
}

export default App;