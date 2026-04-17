const { Groq } = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Example function to use Groq AI for image metadata or categorization
 * @param {string} prompt - The prompt to send to Groq
 * @returns {Promise<string>} The response content
 */
const generateGroqResponse = async (prompt) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant helping to categorize and manage images in a folder system.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      // Let's use the fastest model: LLaMA 3 8B or 70B
      model: 'llama3-8b-8192',
    });

    return chatCompletion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq AI Error:', error);
    throw error;
  }
};

module.exports = { groq, generateGroqResponse };
