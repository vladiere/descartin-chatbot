const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const port = 8080

const configurations = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configurations);
const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.render('index', { title: 'Descartin Chatbot' })
})


app.post('/chat', async (req, res) => {
    await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.message,
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
        .then(data => {
            console.log(req.body.message);
            res.send({ message : data.data.choices[0].text})
        })
})

app.listen(port, () => {
    console.info(`Port ${port} listening on`)
})