const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./config.json");
const { EmbedBuilder } = require("discord.js");
const fetchResponse = require("./helpers/chatgpt-fetch.js");
const cooldowns = require("./helpers/cooldown");

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  await interaction.deferReply();

  if (interaction.commandName === "chat") {
    const userMessage = interaction.options.getString("message");
    const checkCooldown = await cooldowns.getCooldown(interaction.user.id);

    if (checkCooldown) {
      const minutes = Math.floor(checkCooldown / 60000);
      const seconds = ((checkCooldown % 60000) / 1000).toFixed(0);
      const timeLeft =
        minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";

      return await interaction.editReply(
        `You are on cooldown for another **${timeLeft}**.`
      );
    }

    cooldowns.addCooldown(interaction.user.id);
    const chatGptReply = await fetchResponse(userMessage);

    let embed = new EmbedBuilder()
      .setTitle("ChatGPT-4")
      .setDescription(
        "[**View On GitHub**](https://github.com/samennis1/ChatGPT-Discord-Bot)"
      )
      .addFields(
        { name: interaction.user.username, value: userMessage },
        { name: "ChatGPT", value: chatGptReply }
      )
      .setColor("#6B5B95")
      .setThumbnail(client.user.avatarURL())
      .setFooter({
        text: `Created by @samennis1. Powered by ${config.engine}`,
        iconURL: "https://avatars.githubusercontent.com/u/4116928?v=4",
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
});

client.on("ready", () => {
  client.user.setActivity("you give away your data", { type: "WATCHING" });
  client.user.setPresence({ status: "dnd" });
  console.log("Bot Online!");
});

client.login(config.bot_token);
