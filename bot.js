const TelegramBot = require('node-telegram-bot-api');

// Read the token from the environment variable
const token = process.env.TELEGRAM_BOT_TOKEN;
// Check if the token is defined
if (!token) {
    console.error('Telegram bot token is not defined. Make sure to set the TELEGRAM_BOT_TOKEN environment variable.');
    process.exit(1); // Exit the process if the token is not defined
}
const bot = new TelegramBot(token, { polling: true });

const headerImage = 'https://wordpress-949276-4097976.cloudwaysapps.com/wp-content/uploads/2024/02/376X200-sports-10.webp';
const websiteButtons = [
    ['🎲 2024 SPORTSBOOKS REVIEWS 🎲', 'https://t.me/webappole_bot/Sportsbooks'],
    ['🎰 CRYPTO CASINOS REVIEWS 🎰', 'https://t.me/webappole_bot/Casinos'],
    ['📰 2024 CRYPTO BETTING NEWS 📰', 'https://t.me/webappole_bot/News'],
    ['💰 TOP 2024 CRYPTO BONUSES 💰', 'https://t.me/webappole_bot/Bonuses']
];

function sendWelcomeMessage(chatId, userName) {
    try {
        // Sending welcome message with photo and inline keyboard buttons
        bot.sendPhoto(chatId, headerImage, {
            caption: `👋 <b>*Hi, ${userName} Welcome to Cryptovig Telegram App Menu!* </b>👋 \n\nThis bot provides quick access to cryptovig.com most relevant content related to <b><i>SPORTSBOOKS, CASINOS, NEWS, and BONUSES</i></b> 💰💸🎉. Simply click or tap on any button below to open the respective webpage within the Telegram app. You can choose from the following options: 🎉`,
            parse_mode: 'HTML'
        });

        const keyboardMarkup = websiteButtons.map(button => [{
            text: button[0],
            url: button[1]
        }]);

        bot.sendMessage(chatId, 'Click one of the buttons below to open a website:', {
            reply_markup: {
                inline_keyboard: keyboardMarkup,
                resize_keyboard: false
            }
        });

        console.log(`Welcome message sent to chat ID ${chatId}`);
    } catch (error) {
        console.error(`Error sending welcome message: ${error}`);
        bot.sendMessage(chatId, 'An error occurred while sending the welcome message. Please try again later.');
    }
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name; // Get user's first name
    sendWelcomeMessage(chatId, userName);
});