const { SlashCommandBuilder } = require('@discordjs/builders');
const {Interaction, MessageEmbed} = require("discord.js");
const fetch = require("node-fetch");
const {catAPIkey} = require("../config.json"); 

module.exports = {
   data: new SlashCommandBuilder()
   .setName('cat')
   .setDescription('Displays a cute cat picture'),
 /**
  * 
  * @param {Interaction} interaction
  */
      async execute (interaction) {
      try {
         await interaction.deferReply().catch({});
         const fetchAPI = async () => {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search`, {
               method: "GET",
               headers: {"key": catAPIkey}
            })
            
            const jsonresp = await response.json();
            return await jsonresp[0].url;
         }
         const embed = new MessageEmbed().setColor("AQUA")
         
         embed.setImage(await fetchAPI())
         await interaction.editReply({embeds:[embed]})
      
      } catch (error) {
         console.log("something went wrong", error);
      }
      
   },
};

