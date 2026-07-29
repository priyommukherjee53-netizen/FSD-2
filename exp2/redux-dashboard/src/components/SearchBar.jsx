import { useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/postsSlice";

function SearchBar() {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="Search posts..."
      onChange={(e) => dispatch(setSearch(e.target.value))}
    />
  );
}

export default SearchBar;