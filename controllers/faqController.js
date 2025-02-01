const FAQ = require("../models/FAQ");
const { translateText } = require("../services/translationService.js");
const { getCache, setCache } = require('../services/cacheService');


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
  const lang = req.query.lang || 'en';

  try {
    const cacheKey = `faqs:${lang}`;
    const cachedFaqs = await getCache(cacheKey);

    if (cachedFaqs) {
      // console.log('Returning cached FAQs');
      return res.json(cachedFaqs);
    }

    const faqs = await FAQ.find();

    const translatedFaqs = await Promise.all(
      faqs.map(async (faq) => {
        if (lang !== 'en' && faq.translations[lang]) {
          return {
            question: faq.translations[lang].question || faq.question,
            answer: faq.translations[lang].answer || faq.answer,
          };
        }
        return {
          question: faq.question,
          answer: faq.answer,
        };
      })
    );

    // Set the response in Redis Cache
    await setCache(cacheKey, translatedFaqs);

    res.json(translatedFaqs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

