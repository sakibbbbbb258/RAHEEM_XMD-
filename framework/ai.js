// framework/ai.js
const axios = require('axios');

const OPENAI_KEY = 'your-api-key';

async function getGptReply(prompt) {
  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.choices[0]?.message?.content?.trim();
  } catch (e) {
    console.error('GPT API Error:', e?.response?.data || e);
    return "⚠️ AI is currently unavailable. Try again later.";
  }
}

module.exports = { getGptReply };
