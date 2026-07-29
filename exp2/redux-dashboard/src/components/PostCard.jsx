import React from "react";
import { useDispatch } from "react-redux";
import {
  likePost,
  deletePost,
} from "../redux/slices/postsSlice";

function PostCard({ post }) {
  const dispatch = useDispatch();

  return (
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
  );
}

export default React.memo(PostCard);