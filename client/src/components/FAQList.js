import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchFAQs = async () => {
      try { 
        const { data } = await axios.get(`http://localhost:5000/api/faqs/?lang=${language}`);
        if(data?.cachedFaqs?.length >0)
            setFaqs(data?.cachedFaqs)
        else setFaqs(data?.translatedFaqs)
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, [language]);

  return (
    <div>
      <div>
        <button onClick={() => setLanguage("en")}>English</button>
        <button onClick={() => setLanguage("hi")}>Hindi</button>
        <button onClick={() => setLanguage("bn")}>Bengali</button>
      </div>

      {faqs?.length > 0 ? (
  <div>
    {faqs.map((faq, index) => (
      <div key={index}>
        <h3>{faq.question}</h3>
        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
      </div>
    ))}
  </div>
) : (
  <div>No FAQs found</div>
)}
    </div>
  );
};

export default FAQList;
