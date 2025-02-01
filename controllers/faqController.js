const FAQ = require("../models/FAQ");

const { translateText } = require("../services/translationService.js");

exports.addFAQ = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const translations = {};
    translations.hi = {
      question: await translateText(question, "hi"),
      answer: await translateText(answer, "hi"),
    };
    translations.bn = {
      question: await translateText(question, "bn"),
      answer: await translateText(answer, "bn"),
    };

    const newFAQ = new FAQ({ question, answer, translations });
    await newFAQ.save();
    res
      .status(201)
      .json({
        message: "FAQ added successfully with translations!",
        faq: newFAQ,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFAQs = async (req, res) => {
  const lang = req.query.lang || "en";

  try {
    const faqs = await FAQ.find();

    const translatedFaqs = faqs.map((faq) => {
      if (lang !== "en" && faq.translations[lang]) {
        return {
          question: faq.translations[lang].question || faq.question,
          answer: faq.translations[lang].answer || faq.answer,
        };
      }
      return { question: faq.question, answer: faq.answer };
    });

    // res.json(translatedFaqs);
    res
      .status(200)
      .json({
        message: "FAQ retrieved successfully!",
        translatedFaqs: translatedFaqs,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
