# ChatGPT Discord Bot

Welcome to the ChatGPT Discord Bot! This bot allows you to chat with an AI language model called ChatGPT. With ChatGPT, you can have conversations about any topic imaginable, from the weather and sports to science and philosophy. The bot is powered by OpenAI's GPT architecture, which makes it capable of holding intelligent, nuanced conversations that feel almost human-like.

## Features

- Chat with an AI language model in your Discord server
- Supports a wide range of topics and conversation styles
- Easy to use and customizable

## How to Use

1. Clone this repo using `git clone`
2. Head to https://www.discord.com/developers/applications
3. Create a new bot app, copy the token
4. Grab your OpenAI token from https://openai.com
5. Copy `config.json.example` as a new `config.json` and fill in the fields
   - Bot Token
   - OpenAI Token
   - Guild ID (Optional)
   - Bot Owner ID
   - Client ID (from https://www.discord.com/developers/applications within your bot application)
   - Engine (generally gpt-3 or gpt-4)
   - Base prompt (Telling ChatGPT how to answer a query, for example, as concisely as possible)
   - Whether Cooldown system is enabled
   - Cooldown milliseconds
   - List any users who can bypass this cooldown
6. Type `npm i`
7. Type `node register_slash`
8. Type `node bot`

## Examples

Here are some examples of conversations you can have with ChatGPT:

- "Hey ChatGPT, what's the weather like today?"
- "ChatGPT, do you think artificial intelligence will ever surpass human intelligence?"
- "Can you tell me a joke, ChatGPT?"
- "What is a binary tree?"

## About OpenAI

![OpenAI Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1600px-OpenAI_Logo.svg.png?20221228112417)

The ChatGPT Discord Bot is powered by OpenAI's GPT architecture. OpenAI is an AI research laboratory consisting of the for-profit corporation OpenAI LP and its parent company, the non-profit OpenAI Inc. The company's goal is to create artificial general intelligence in a way that is safe and beneficial for humanity.

## Contributing

This is an open source project, so contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/yourusername/chatgpt-discord-bot/blob/main/LICENSE.md) file for details.
