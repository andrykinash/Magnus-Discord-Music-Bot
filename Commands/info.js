const { SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
   data: new SlashCommandBuilder()
   .setName('info')
   .setDescription('Returns info based on input')
   .addSubcommand(subcommand =>
      subcommand
         .setName('user')
         .setDescription('gets user information')
         .addUserOption(option => option.setName("target").setDescription("This user mentioned")))
         
   .addSubcommand(subcommand => 
         subcommand
         .setName('server')
         .setDescription('gets server information')),

         async execute(interaction)  {
            if (interaction.options.getSubcommand() === 'user') {
               const user = interaction.options.getUser("target");
                  if (user) {
                     await interaction.reply(`Username: ${user.username}\nUser ID: ${user.id}`); 
                  } else {
                     await interaction.reply(`Username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
                  }
            } else if (interaction.options.getSubcommand() === 'server') {
                  
                  await interaction.reply(`Server: ${interaction.guild.name}\nTotal Members: ${interaction.guild.membercount}`);
            
            }
         }
};