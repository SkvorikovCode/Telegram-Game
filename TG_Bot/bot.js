const TelegramBot = require('node-telegram-bot-api');
const commands = require('./commands.js');
const token = '7006683711:AAG373jiu6WZx2JD0pz7A7WBgcPto4VJiRs';
const bot = new TelegramBot(token, { polling: true });
commands.init(bot);

bot.onText(/\/start/, (msg) => {
    commands.start(msg);
});
bot.onText(/\/help/, (msg) => {
    commands.help(msg);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;
    const messageId = query.message.message_id;
    const data = query.data;
    const keyboard_rep = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Перейти к каналу', url: 'https://t.me/CodeEasy_Frontend' }],
                [{ text: 'Проверить подписку', callback_data: 'check_subscription' }]
            ]
        }
    };
    const keyboard_good = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Перейти к игре в браузере', url: 'https://t.me/CodeEasy_Frontend' }],
                // [{ type: 'keyboardButtonWebView', text: 'Play Game', url: 'https://game.ai-code.team'}]
            ]
        }
    };
    if (data === 'check_subscription') {
        const channelId = '-1002001544510';

        bot.getChatMember(channelId, userId).then((chatMember) => {
            if (chatMember && (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator')) {
                // Если пользователь подписан на канал
                const subscriptionMessage = 'Проверка на подписку пройдена 👍\n🎮Вы можете запустить игру!';
                bot.sendMessage(chatId, subscriptionMessage, /*keyboard_good,*/ { reply_to_message_id: messageId });
            
            } else {
                // Если пользователь не подписан на канал, отправляем сообщение с приглашением подписаться
                const subscribeMessage = '🎮 Для доступа к Игре нужно подписаться на наш канал.';
                bot.sendMessage(chatId, subscribeMessage, keyboard_rep, { reply_to_message_id: messageId });
            }
        }).catch((error) => {
            console.error('Ошибка при проверке подписки:', error);
            const errorMessage = 'Произошла ошибка при проверке подписки. Попробуйте позже.';
            bot.sendMessage(chatId, errorMessage, { reply_to_message_id: messageId });
        });
    } else {
        // Если нажата другая кнопка, передаем управление обработчику из commands.js
        commands.handleCallbackQuery(query);
    }
});

console.log('Bot is running...');