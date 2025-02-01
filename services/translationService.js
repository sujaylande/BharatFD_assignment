const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

exports.translateText = async (text, targetLanguage) => {
  if (!text) return '';
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error('Translation Error:', error);
    return text;
  }
};
