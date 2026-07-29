import { useSelector } from "react-redux";
import { selectLinkedInPosts } from "../features/posts/postsSelectors";

function FilteredPosts(){

    const posts=useSelector(selectLinkedInPosts);

    return(

        <div className="card shadow p-4">

            <h3 className="mb-4">

                LinkedIn Posts
                <small className="text-success ms-2">
                    (Memoized Selector)
                </small>

            </h3>

            <ul className="list-group">

                {

                    posts.map(post=>(

                        <li
                        key={post.id}
                        className="list-group-item"
                        >

                            {post.title}

                        </li>

                    ))

                }

            </ul>

        </div>

    )

}

export default FilteredPosts;