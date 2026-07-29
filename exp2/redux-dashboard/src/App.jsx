import Dashboard from "./components/Dashboard";
import AddPost from "./components/AddPost";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import PostList from "./components/PostList";
import Statistics from "./components/Statistics";

function App() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        Redux Toolkit Dashboard
      </h1>

      <Dashboard />

      <AddPost />

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar />
        </div>

        <div className="col-md-6">
          <Filter />
        </div>
      </div>

      <PostList />

      <Statistics />
    </div>
  );
}

export default App;