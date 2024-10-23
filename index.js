const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Provider } = require("./axios");
const fs = require('fs');
const PORT = process.env.PORT || 4040;

const app = express();
app.use(express.json());
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


async function sendMessage(chatId, text) {
    return Provider.post("/sendMessage", {
        chat_id: chatId,
        text: text
    });
}

async function sendPool(chatId, question, options) {
    try {
        await Provider.post("/sendPoll", {
            chat_id: chatId,
            question,
            allows_multiple_answers: false,
            options: [
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
            ]
        });
    } catch (error) {
        console.log(error.response.data);
    }
}

async function sendFile(chatId, file) {
    try {
        await bot.sendDocument(chatId, "./file.pdf");
    } catch (error) {
        console.log(error.response);
    }
}

function handleMessage(message) {
    try {
        if (message?.voice) {
            return sendFile(message.chat.id, file);
        }
        const chatId = message.chat.id;
        const text = message.text;
        if (text.toLowerCase().includes("olá") || text.toLowerCase().includes("oi") || text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi") || text.toLowerCase().includes("hey")) {
            setTimeout(() => {
                sendMessage(chatId, Messages.afterGreetings);
                setTimeout(() => {
                    sendPool(chatId, "Você tem interesse em realizar algum dos serviços abaixo: ");
                }, 2000);
            }, 2000);

            return sendMessage(chatId, Messages.greetings);
        }

        return sendMessage(chatId, text);
    } catch (error) {

    }
}

app.post("*", async (req, res) => {
    console.log(req.body.message);
    await handleMessage(req.body.message);
    return res.send("Hello post");
});
app.get("*", async (req, res) => {
    return res.send("Hello get");
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});