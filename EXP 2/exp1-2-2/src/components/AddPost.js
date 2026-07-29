import { useDispatch } from "react-redux";
import { addPost } from "../features/postsSlice";

function AddPost() {

  const dispatch = useDispatch();

  const handleAdd = () => {

    dispatch(
      addPost({
        id: Date.now(),
        title: "New React Post",
        category: "React",
      })
    );

  };

  return (

    <button onClick={handleAdd}>
      Add React Post
    </button>

  );
}

export default AddPost;