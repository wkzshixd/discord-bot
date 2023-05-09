import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

console.log('//////////////////////')
console.log('///////by wkz/////////')
console.log('////////v1.2//////////')
console.log('//////////////////////\n')
console.log('starting . . .')


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const channelId = "1105608797067694110";
client.on("messageCreate", async function (message) {
  if (message.author.bot) return;
  console.log(message.channel.id);
  if (message.channel.id == channelId) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant who responds succinctly",
          },
          { role: "user", content: message.content },
        ],
      });
      const content = response.data.choices[0].message;
      return message.reply(content);
    } catch (err) {
      console.log(err)
      return message.reply("i'm an AI robot build by wkz, of course I errored out.");
    }
  }
});

client.login(process.env.BOT_TOKEN);
