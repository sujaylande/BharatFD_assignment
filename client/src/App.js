import React from "react";
import FAQEditor from "./components/FAQEditor";
import FAQList from "./components/FAQList";
import axios from "axios";

const App = () => {
  const handleAddFAQ = async (question, answer) => {
    try {
      await axios.post("http://localhost:5000/api/faqs", { question, answer });
      alert("FAQ added successfully");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      alert("Error adding FAQ");
    }
  };

  return (
    <div>
      <h1>FAQ Management</h1>
      <FAQEditor onSubmit={handleAddFAQ} />
      <FAQList />
    </div>
  );
};

export default App;
