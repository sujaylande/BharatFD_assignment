const FAQ = require('../models/FAQ');

exports.addFAQ = async (req, res) => {
  const { question, answer, translations } = req.body; //add cheack if we get all the data

  try {
    const newFAQ = new FAQ({ question, answer, translations });
    await newFAQ.save();
    res.status(201).json({ message: 'FAQ added successfully!', faq: newFAQ });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFAQs = async (req, res) => {
  const lang = req.query.lang || 'en';

  try {
    const faqs = await FAQ.find();

    const translatedFaqs = faqs.map(faq => {
      if (lang !== 'en' && faq.translations[lang]) {
        return {
          question: faq.translations[lang].question || faq.question,
          answer: faq.translations[lang].answer || faq.answer,
        };
      }
      return { question: faq.question, answer: faq.answer };
    });

    // res.json(translatedFaqs);
    res.status(200).json({ message: 'FAQ retrieved successfully!', translatedFaqs: translatedFaqs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
