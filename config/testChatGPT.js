
require('dotenv').config()

// import{config}from 'dotenv'

// config()



async function chatGPT () {

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);
const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
}) .then(res=>{
    console.log(res.data.choices[0].message.content)
})


}


chatGPT()