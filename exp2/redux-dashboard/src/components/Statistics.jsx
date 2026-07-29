import { useMemo } from "react";
import { useSelector } from "react-redux";

function Statistics() {
  const posts = useSelector((state) => state.posts.posts);

  const averageLikes = useMemo(() => {
    if (posts.length === 0) return 0;

    const total = posts.reduce(
      (sum, post) => sum + post.likes,
      0
    );

    return (total / posts.length).toFixed(1);
  }, [posts]);

  return (
    <div className="card mt-5 shadow">

      <div className="card-body">

        <h3>Statistics</h3>

        <hr />

        <h5>Average Likes : {averageLikes}</h5>

        <h5>Total Posts : {posts.length}</h5>

      </div>

    </div>
  );
}

export default Statistics;