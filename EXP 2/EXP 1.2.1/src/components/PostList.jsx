import { memo } from "react";
import { useSelector,useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

function PostList(){

    const posts=useSelector(state=>state.posts.posts);

    const dispatch=useDispatch();

    return(

        <>

        <h2 className="mb-4">
            All Posts ({posts.length})
        </h2>

        {

            posts.map(post=>(

                <div
                key={post.id}
                className="card shadow-sm mb-3"
                >

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h5>{post.title}</h5>

                                <span className="badge bg-info text-dark">

                                    {post.platform}

                                </span>

                            </div>

                            <button
                            className="btn btn-danger"
                            onClick={()=>dispatch(deletePost(post.id))}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            ))

        }

        </>

    )

}

export default memo(PostList);