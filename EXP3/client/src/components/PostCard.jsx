import "../styles/PostCard.css";

const PostCard = ({ post, role, onEdit, onDelete }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>

      <p>{post.content}</p>

      <div className="post-buttons">

        {/* Admin can Edit & Delete */}
        {role === "Admin" && (
          <>
            <button
              className="edit-btn"
              onClick={() => onEdit(post.id)}
            >
              ✏ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(post.id)}
            >
              🗑 Delete
            </button>
          </>
        )}

        {/* Editor can only Edit */}
        {role === "Editor" && (
          <button
            className="edit-btn"
            onClick={() => onEdit(post.id)}
          >
            ✏ Edit
          </button>
        )}

        {/* Viewer can only View */}
        {role === "Viewer" && (
          <span
            style={{
              color: "#666",
              fontWeight: "bold",
            }}
          >
            👁 Read Only
          </span>
        )}

      </div>
    </div>
  );
};

export default PostCard;