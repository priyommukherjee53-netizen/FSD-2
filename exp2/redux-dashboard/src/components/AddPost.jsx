import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/slices/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) return;

    dispatch(addPost(title, body, platform));

    setTitle("");
    setBody("");
    setPlatform("Instagram");
  };

  return (
    <div className="card p-4 shadow mb-4">
      <h3>Add New Post</h3>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>Twitter</option>
          <option>LinkedIn</option>
          <option>YouTube</option>
        </select>

        <button className="btn btn-primary">
          Add Post
        </button>

      </form>
    </div>
  );
}

export default AddPost;