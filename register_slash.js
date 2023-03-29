const config = require("./config.json");
const { SlashCommandBuilder, REST, Routes } = require("discord.js");

const chatCommand = new SlashCommandBuilder()
  .setName("chat")
  .setDescription("Send a message to ChatGPT and receive a reply")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("The message you want to send to ChatGPT")
      .setRequired(true)
  );

const rest = new REST({ version: "10" }).setToken(config.bot_token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    const commands = [];
    commands.push(chatCommand.toJSON());

    if (config.guild_id) {
      await rest.put(
        Routes.applicationGuildCommands(config.client_id, config.guild_id),
        {
          body: commands,
        }
      );
    } else {
      await rest.put(Routes.applicationCommands(config.client_id), {
        body: commands,
      });
    }

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
