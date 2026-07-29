import { useSelector } from "react-redux";
import {
  selectTotalLikes,
  selectTotalPosts,
} from "../redux/selectors/postSelectors";

function Dashboard() {
  const totalPosts = useSelector(selectTotalPosts);
  const totalLikes = useSelector(selectTotalLikes);

  return (
    <div className="row mb-4">

      <div className="col-md-6">

        <div className="card text-center bg-primary text-white shadow">

          <div className="card-body">

            <h3>Total Posts</h3>

            <h1>{totalPosts}</h1>

          </div>

        </div>

      </div>

      <div className="col-md-6">

        <div className="card text-center bg-success text-white shadow">

          <div className="card-body">

            <h3>Total Likes</h3>

            <h1>{totalLikes}</h1>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;