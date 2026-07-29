import { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  console.log("Counter Render");

  return (

    <div>

      <h2>Counter : {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment Counter
      </button>

    </div>

  );
}

export default Counter;