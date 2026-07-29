import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectReactPosts } from "../features/postsSlice";

const FilteredPosts = React.memo(() => {

  const posts = useSelector(selectReactPosts);

  const total = useMemo(() => {

    console.log("Calculating Total");

    return posts.length;

  }, [posts]);

  console.log("FilteredPosts Render");

  return (

    <div>

      <h2>React Posts</h2>

      <h3>Total React Posts : {total}</h3>

      {posts.map((post) => (

        <div key={post.id}>
          {post.title}
        </div>

      ))}

    </div>

  );

});

export default FilteredPosts;