import { selectFilteredPosts } from "../redux/selectors/postSelectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import {
  fetchPosts,
  deletePost,
  likePost,
} from "../redux/slices/postsSlice";

function PostList() {
  const dispatch = useDispatch();

 const { loading } = useSelector(
  (state) => state.posts
);

const posts = useSelector(selectFilteredPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="row">

      {posts.map((post) => (

        <div className="col-md-6 mb-4" key={post.id}>

          <div className="card shadow">

            <div className="card-body">

              <h4>{post.title}</h4>

              <p>{post.body}</p>

              <span className="badge bg-primary">
                {post.platform}
              </span>

              <br />
              <br />

              <button
                className="btn btn-success me-2"
                onClick={() => dispatch(likePost(post.id))}
              >
                ❤️ {post.likes}
              </button>

              <button
                className="btn btn-danger"
                onClick={() => dispatch(deletePost(post.id))}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default PostList;