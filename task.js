require('dotenv').config({ path: './config/.env' });

const Groq = require('groq-sdk');

const groq = new Groq(process.env.GROQ_API_KEY);

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": " hello ! you are a chatbot that helps chefs with their recipes or suggests food. your name is  D'sbooklet,give response in english"
      },
      {
        "role": "user",
        "content": "tell me something to make for breakfast?"
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 150,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
