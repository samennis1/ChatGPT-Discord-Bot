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

    // For every 1000 characters in chatGptReply, add a new field
    let fields = [];
    let field = { name: "ChatGPT", value: "" };
    for (let i = 0; i < chatGptReply.length; i++) {
      if (field.value.length < 1000) {
        field.value += chatGptReply[i];

        if (i == chatGptReply.length - 1) fields.push(field);
      } else {
        let addValue = chatGptReply[i];

        const hasCodeBlock = field.value.split("```");

        if (hasCodeBlock.length > 1 && hasCodeBlock.length % 3 !== 0) {
          const language = field.value.split("```")[1].split("\n")[0];
          field.value += "```";
          addValue = "```" + language + "\n" + addValue;
        }

        fields.push(field);
        field = { name: "Continued...", value: addValue };
      }
    }

    let embed = new EmbedBuilder()
      .setTitle("ChatGPT-4")
      .setDescription(
        "[**View On GitHub**](https://github.com/samennis1/ChatGPT-Discord-Bot)"
      )
      .addFields(
        { name: interaction.user.username, value: userMessage },
        ...fields
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
  client.user.setPresence({
    activities: [{ name: config.bot_status, type: "WATCHING" }],
    status: "dnd",
  });
});

client.login(config.bot_token);
