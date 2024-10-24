const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = "7728375831:AAEAlHQP4JgvSw0dnBSJ3Zseta6NAjTc728";
const bot = new TelegramBot(TOKEN, { polling: true });

const Messages = {
    greetings: `
        Olá, Wellington, tudo bem? 

Acabei de ver aqui que você tem um cadastro de propriedade comigo ☺

Estou vendo que essa é a primeira vez usando minha tecnologia, então vou lhe explicar como funciono.
    `,
    afterGreetings: `
        Meu nome é Gaia, uma inteligência Artificial criada para auxiliar agricultores profissionalizar em sua produção de forma sustentável e que maxime a geração de renda. 

Possuo alguns serviços que você pode utilizar, como você já está cadastrado convosco, você já pode solicitar um série de Serviços.
    `
};

const options = [
    {
        text: "Análise da saúde da plantação",
    },
    {
        text: "Análise meteorologia por inteligência Artificial",
    },
    {
        text: "Conselho de boa práticas que fortaleçam a Bioecononia sustentável",
    },
    {
        text: "Serviços completo de análise da propriedade, com dados via satélite",
    },
    {
        text: "Não desejo realizar serviço, quero continuar a conversa",
    }
];

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (msg?.voice) {
        const file = fs.readFileSync("./file.pdf");
        const audio = fs.readFileSync("./zap.mp3");
        bot.sendMessage(chatId, "Aguarde... Estou processando o arquivo");
        bot.sendVoice(chatId, audio, { caption: "Olá, vejo..." }, {
            filename: "audio",
            contentType: "audio/mp3"
        });
        return bot.sendDocument(chatId, file);
    }

    if (text.toLowerCase().includes("olá") || text.toLowerCase().includes("oi") || text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi") || text.toLowerCase().includes("hey")) {
        setTimeout(() => {
            bot.sendMessage(chatId, Messages.afterGreetings);
            setTimeout(() => {
                bot.sendPoll(chatId, "Você tem interesse em realizar algum dos serviços abaixo: ", options, {
                    allows_multiple_answers: false
                });
            }, 2000);
        }, 2000);

        return bot.sendMessage(chatId, Messages.greetings);
    }

    bot.sendMessage(chatId, 'Received your message');
});