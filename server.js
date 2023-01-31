import express, { json } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios';


const configuration = new Configuration({

    apiKey: process.env.OPENAI_SECRET_KEY,

});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX!'
    })
})



// http://localhost:5000/getCompletion?text=Hola mundo
app.post("/chat", async(req, res, next) => {
     
     const prompt = req.body.prompt;
     
     const options = {
        method: 'POST',
        url: 'https://you-chat-gpt.p.rapidapi.com/TextOnly',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '42d3baef34msh99573537c1591c4p1a10b3jsn3b305e04d1a1',
            'X-RapidAPI-Host': 'you-chat-gpt.p.rapidapi.com'
        },
        data: '{"question":"list 10 ways to become a better programmer?","max_response_time":10}'
     };

    try {
        console.log(req);
        const res = await axios.request(options);
        res.json(res.data);
      }
      catch (err) {
        next(err)
    }
})





app.listen(5000, () => {
    console.log('AI server started on http://localhost:5000');
})





// POST, SET, GET, DELETE