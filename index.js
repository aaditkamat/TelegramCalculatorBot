const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

var option, verb;

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Hi, this is the Calculator bot.\nPlease select one of these options(1, 2, 3, 4):\n1.Add\n2.Subtract\n3.Multiply\n4.Divide"
  );
});

bot.onText(/[1-4]$/, (msg) => {
  option = parseInt(msg.text);
  switch (option) {
    case 1:
      verb = "add";
      break;
    case 2:
      verb = "subtract";
      break;
    case 3:
      verb = "multiply";
      break;
    case 4:
      verb = "divide";
      break;
    default:
      throw new Error("Please enter the correct option (1, 2, 3, 4)");
  }
  bot.sendMessage(
    msg.chat.id,
    `Enter the 2 numbers you wish to ${verb} seperated by a space (e.g. 3.5 4.6)`
  );
});

const calculate = (msg, option) => {
  let operation;
  switch (option) {
    case 1:
      operation = (prev, curr) => prev + curr;
      break;
    case 2:
      operation = (prev, curr) => prev - curr;
      break;
    case 3:
      operation = (prev, curr) => prev * curr;
      break;
    case 4:
      operation = (prev, curr) => prev / curr;
      break;
  }
  return msg.text
    .split(" ")
    .map((token) => parseFloat(token))
    .reduce(operation);
};

bot.onText(/(\d\.?\d*)\s(\d\.?\d*)/, (msg) => {
  const result = calculate(msg, option);
  console.log(result);
  bot.sendMessage(
    msg.chat.id,
    `The result of ${verb}ing the 2 numbers is: ${result}`
  );
});
