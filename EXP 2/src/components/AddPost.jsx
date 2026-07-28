import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function AddPost() {

    const [title,setTitle]=useState("");
    const [platform,setPlatform]=useState("LinkedIn");

    const dispatch=useDispatch();

    const handleSubmit=()=>{

        if(title==="") return;

        dispatch(addPost({
            id:Date.now(),
            title,
            platform
        }));

        setTitle("");
    }

    return(

        <div className="card shadow p-4">

            <h3 className="mb-4">
                Add New Post
            </h3>

            <input
            className="form-control mb-3"
            placeholder="Enter Post Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />

            <select
            className="form-select mb-3"
            value={platform}
            onChange={(e)=>setPlatform(e.target.value)}
            >

                <option>LinkedIn</option>
                <option>Twitter</option>
                <option>Instagram</option>

            </select>

            <button
            className="btn btn-primary"
            onClick={handleSubmit}
            >
                Add Post
            </button>

        </div>

    )

}

export default AddPost;