const axios = require('axios');
// Функция для инициализации объекта бота
function init(_bot) {
    bot = _bot;
}

// Функция для обработки команды /start
function start(msg) {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'user'; // Проверяем наличие имени пользователя

    const welcomeMessage = `Приветствую тебя, ${username}! Чтобы получить доступ к нашей игре, подпишись на канал.`;

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Перейти к каналу', url: 'https://t.me/CodeEasy_Frontend' }],
                [{ text: 'Проверить подписку', callback_data: 'check_subscription' }]
            ]
        }
    };
    runPhpScript(chatId);
    bot.sendMessage(chatId, welcomeMessage, keyboard);
}

// Функция для обработки команды /help
function help(msg) {
    const chatId = msg.chat.id;
    // Добавь необходимую логику для команды /help
}

function handleCallbackQuery(query) {
    const chatId = query.message.chat.id;
    const data = query.data;

    // if (data =! 'check_subscription') {
    //     bot.sendMessage(chatId, 'Вы подписаны на канал 👍');
    // }
}

// Функция для выполнения PHP-скрипта
async function runPhpScript(chatId) {
    try {
        // Отправляем GET-запрос на локальный PHP-скрипт
        const response = await axios.get('./API.php'); // Укажите полный URL к вашему PHP-скрипту
        // Отправляем результат выполнения скрипта обратно в чат
        // bot.sendMessage(chatId, response.data);
        console.log('Скрипт сработал:', response.data);
    } catch (error) {
        console.error('Ошибка выполнения PHP-скрипта:', error.message);
        // bot.sendMessage(chatId, 'Произошла ошибка выполнения PHP-скрипта.');
    }
}

module.exports = {
    init,
    start,
    help,
    handleCallbackQuery
};
