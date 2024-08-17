const {SlashCommandBuilder} = require("@discordjs/builders");
const {Interaction, MessageEmbed} = require("discord.js");
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
          async execute(interaction){
           const player = interaction.options.getString("player");
           const platform = interaction.options.getString("platform");
           //await interaction.deferReply()
           const gamertag = new URLSearchParams({ player });
           const source = new URLSearchParams({ platform });
           
           
           const { data } = await fetch(`https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${gamertag}/${source}`, {
                method: "GET",
                headers: {
                  "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
                  "x-rapidapi-key": "6fc0286367msh1fe9dce4d6f860dp113b13jsn444396710dd8"
                }
                
              })
              .then(response => response.json());
               
                const [answer] = data;

                const embed = new MessageEmbed()
                  .setColor('RANDOM')
                  .setTitle("Player Stats")
                  .addFields(
                    {name: "kills", value: DataTransferItem(answer.kdRatio)},
                  );
                  interaction.editReply({embeds: [embed]});
          },
            
          
};

