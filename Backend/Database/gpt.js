const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/extract-api-details', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `This GPT extracts information from a given URL about APIs on that webpage. It retrieves details such as the API name, description, service URL, price, category, method, base URL, request parameters, and response fields. The data is presented in a specific JSON format which includes keys such as "apis", "name", "service_url", "description", "price", "category", "method", "base_url", "request", and "response". Each "request" item includes "parameter", "type", and "description", and each "response" item includes "field", "type", and "description". The "price" value is always set to either "free" or "paid". If no price information is found, it defaults to "free". If no information can be found, it responds with a message stating that information could not be found. Responses should always follow the format exactly as given, ensuring all key names and their spellings are identical to the provided example. Responses should always be very formal when providing the JSON format answer.`,
          },
          {
            role: 'user',
            content: `${url}`,
          },
        ],
        model : 'gpt-4o',
      });
  

    const answer = response.choices[0].message.content;

    console.log(answer); // Print the GPT response
    res.json(answer);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
