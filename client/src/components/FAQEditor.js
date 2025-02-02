// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const FAQEditor = ({ onSubmit }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await onSubmit(question, answer);
//       setQuestion("");
//       setAnswer("");
//     } catch (error) {
//       console.error("Error submitting FAQ:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//       <div style={{ marginBottom: "10px" }}>
//         <label>Question:</label>
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>
//       <div style={{ marginBottom: "10px" }}>
//         <label>Answer:</label>
//         <ReactQuill
//           value={answer}
//           onChange={setAnswer}
//           style={{ height: "200px", marginTop: "5px" }}
//         />
//       </div>
//       <div style={{ textAlign: "right" }}>
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             marginTop: "30px",
//           }}
//         >
//           Add FAQ
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FAQEditor;


import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FAQEditor = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      setNotification("Question and Answer cannot be empty");
      setTimeout(() => {
        setNotification("");
      }, 3000);
      return;
    }
    try {
      await onSubmit(question, answer);
      setQuestion("");
      setAnswer("");
      setNotification("FAQ added successfully");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting FAQ:", error);
      setNotification("Error submitting FAQ");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      {notification && <div style={{ marginBottom: "10px", color: "red" }}>{notification}</div>}
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </div>
      <div>
        <label>Answer:</label>
        <ReactQuill
          value={answer}
          onChange={setAnswer}
          style={{ height: "300px", marginBottom: "10px" }}
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "40px",
          }}
        >
          Add FAQ
        </button>
      </div>
    </form>
  );
};

export default FAQEditor;