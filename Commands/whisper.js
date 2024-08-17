const {SlashCommandBuilder} = require("@discordjs/builders");
const {Interaction} = require("discord.js");




module.exports = {
data: new SlashCommandBuilder()
   .setName("w")
   .setDescription("Send a message to one of your friends")
   .addUserOption((option) =>
            option
               .setName("user")
               .setDescription("Who you would like to send your message to")
               .setRequired(true)
         )
   .addStringOption((option) =>
      option
         .setName("message")
         .setDescription("the message you want to send to selected user")
         .setRequired(true)    
   ),
         /**
          * @param {Interaction} interaction
          */

        async execute(interaction)  {
           const MESSAGE = interaction.options.getString("message");
           const user = interaction.options.getUser("user");
           await interaction.deferReply().catch({});

            if (user) {
                  user.send({content: MESSAGE});
                  interaction.followUp({
                     fetchReply: true,
                     ephemeral: true,
                     content: `I sent the message to ${user.username}`,

                  });
               } else {
                 interaction.followUp({content: MESSAGE});
               }

           },
};