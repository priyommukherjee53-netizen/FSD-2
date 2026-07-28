import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const platformLimits = {
    Twitter: 280,
    Instagram: 2200,
    Facebook: 63206,
    LinkedIn: 3000,
  };

  const [platform, setPlatform] = useState("Twitter");
  const [content, setContent] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const limit = platformLimits[platform];
  const remaining = limit - content.length;

  const saveDraft = () => {
    if (content.trim() === "") return;

    if (editIndex !== null) {
      const temp = [...drafts];
      temp[editIndex] = {
        platform,
        content,
      };
      setDrafts(temp);
      setEditIndex(null);
    } else {
      setDrafts([
        ...drafts,
        {
          platform,
          content,
        },
      ]);
    }

    setContent("");
  };

  const editDraft = (index) => {
    setPlatform(drafts[index].platform);
    setContent(drafts[index].content);
    setEditIndex(index);
  };

  const deleteDraft = (index) => {
    const temp = drafts.filter((_, i) => i !== index);
    setDrafts(temp);
  };

  const publish = () => {
    if (content.trim() === "") return;
    alert("🎉 Post Published Successfully!");
    setContent("");
  };

  return (
    <div className="container">

      <h1>📱 Social Post Composer</h1>

      <div className="card">

        <label>Select Platform</label>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Twitter</option>
          <option>Instagram</option>
          <option>Facebook</option>
          <option>LinkedIn</option>
        </select>

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className={remaining < 0 ? "counter red" : "counter"}>
          {content.length}/{limit}
        </div>

        {remaining < 0 && (
          <p className="warning">
            ⚠ Character limit exceeded!
          </p>
        )}

        <div className="buttons">

          <button
            className="save"
            onClick={saveDraft}
          >
            💾 Save Draft
          </button>

          <button
            className="publish"
            onClick={publish}
          >
            🚀 Publish
          </button>

        </div>

      </div>

      <h2>Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No Drafts Saved</p>
      ) : (
        drafts.map((draft, index) => (
          <div className="draft" key={index}>

            <h3>{draft.platform}</h3>

            <p>{draft.content}</p>

            <button
              className="edit"
              onClick={() => editDraft(index)}
            >
              Edit
            </button>

            <button
              className="delete"
              onClick={() => deleteDraft(index)}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default App;