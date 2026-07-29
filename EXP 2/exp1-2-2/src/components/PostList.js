import { useSelector } from "react-redux";
import { selectPosts } from "../features/postsSlice";

function PostList() {

  const posts = useSelector(selectPosts);

  console.log("PostList Render");

  return (

    <div>

      <h2>All Posts</h2>

      {posts.map((post) => (

        <div key={post.id}>
          {post.title} - {post.category}
        </div>

      ))}

    </div>

  );
}

export default PostList;