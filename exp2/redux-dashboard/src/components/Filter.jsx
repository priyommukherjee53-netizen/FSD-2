import { useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/postsSlice";

function Filter() {

  const dispatch = useDispatch();

  return (
    <select
      className="form-select mb-4"
      onChange={(e) =>
        dispatch(setFilter(e.target.value))
      }
    >
      <option>All</option>
      <option>Instagram</option>
      <option>Facebook</option>
      <option>Twitter</option>
      <option>LinkedIn</option>
      <option>YouTube</option>
    </select>
  );
}

export default Filter;