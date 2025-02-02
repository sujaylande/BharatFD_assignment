import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FAQEditor = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(question, answer);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Answer</label>
        <ReactQuill value={answer} onChange={setAnswer} />
      </div>
      <button type="submit">Add FAQ</button>
    </form>
  );
};

export default FAQEditor;
