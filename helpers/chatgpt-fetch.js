const { OpenAIApi, Configuration } = require("openai");
const config = require("../config.json");

const configuration = new Configuration({
  apiKey: config.openai_key,
});
const openai = new OpenAIApi(configuration);

async function fetchResponseFromChatGPT(prompt) {
  const result = await openai.createChatCompletion({
    model: config.engine,
    messages: [
      {
        role: "system",
        content: config.base_prompt,
      },
      { role: "user", content: prompt },
    ],
  });

  const data = result?.data;
  const choice = data?.choices;
  if (!data || !choice || !choice.length)
    return "Error: No data returned from OpenAI API";

  return data.choices[0].message.content.trim();
}

module.exports = fetchResponseFromChatGPT;
