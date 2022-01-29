const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err) => console.log(err));

bot.start((ctx) => {
  ctx.reply("Hi, this is the Calculator bot.\nPlease select one of these options(1, 2, 3, 4):\n1.Add\n2.Subtract\n3.Multiply\n4.Divide");
});

const calculate = (ctx, option) => {
  let operation, verb;
  switch(option) {
    case 1: 
      operation = (prev, curr) => prev + curr;
      verb = 'add';
      break;
    case 2:
      operation = (prev, curr) => prev - curr;
      verb = 'subtract';
      break;
    case 3:
      operation = (prev, curr) => prev * curr;
      verb = 'multiply';
      break;
    case 4:
      operation = (prev, curr) => prev / curr;
      verb = 'divide';
      break;
    default:
      throw new Error('Please enter the correct option (1, 2, 3, 4)');
  }
  ctx.reply(`Enter the 2 numbers you wish to ${verb} seperated by a space (e.g. 3.5 4.6)`);
}

bot.on('message', (ctx) => {
  const notInteger = isNaN(parseInt(ctx.message.text));
  const option = parseInt(ctx.message.text);
  if (notInteger) {
    ctx.reply("The option entered is not an integer");
    return;
  }
  calculate(ctx, option); 
})

bot.launch();