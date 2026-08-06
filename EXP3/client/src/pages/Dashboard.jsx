import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import initialPosts from "../data/posts";

import "../styles/dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState(initialPosts);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Admin + Editor
  const handleEdit = (id) => {
    const newTitle = prompt("Enter new title");

    if (!newTitle) return;

    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, title: newTitle } : post
      )
    );
  };

  // Admin Only
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Admin Only
  const handleAdd = () => {
    const title = prompt("Enter Post Title");
    const content = prompt("Enter Post Content");

    if (!title || !content) return;

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    setPosts([...posts, newPost]);
  };

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <h2>Welcome {user?.username}</h2>

      <h3>Role : {user?.role}</h3>

      <button onClick={handleLogout}>
        Logout
      </button>

      {/* Admin Only */}
      {user?.role === "Admin" && (
        <button
          onClick={handleAdd}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            padding: "10px 20px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add New Post
        </button>
      )}

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          role={user?.role}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

    </div>
  );
};

export default Dashboard;