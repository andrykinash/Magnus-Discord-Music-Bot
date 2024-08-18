const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("codwz")
      .setDescription("Retrieve player stats from Call of Duty: Warzone")
      .addStringOption(option =>
          option
          .setName("player")
          .setDescription("The name of the player you wish to search")
          .setRequired(true)
          )
      .addStringOption(option =>
            option
            .setName("platform")
            .setDescription("The platform the player plays on")
            .setRequired(true)
            ),
        
          /**
           * @param {Interaction} interaction
           * @param {String[]} args
           */
          async execute(interaction) {
            const player = interaction.options.getString("player");
            const platform = interaction.options.getString("platform");

            await interaction.deferReply(); // Defer the reply

            const url = `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${player}/${platform}`;

            try {
              const response = await fetch(url, {
                method: "GET",
                headers: {
                  "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
                  "x-rapidapi-key": "6fc0286367msh1fe9dce4d6f860dp113b13jsn444396710dd8"
                }
              });

              const data = await response.json();

              if (!data || !data.br) {
                return interaction.editReply("Player stats not found or an error occurred.");
              }

              const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Player Stats")
                .addFields(
                  { name: "Kills", value: `${data.br.kills}`, inline: true },
                  { name: "K/D Ratio", value: `${data.br.kdRatio}`, inline: true }
                );

              await interaction.editReply({ embeds: [embed] });

            } catch (error) {
              console.error(error);
              interaction.editReply("There was an error retrieving the player stats.");
            }
          },
};


