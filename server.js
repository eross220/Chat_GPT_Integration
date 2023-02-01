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
app.post("/", async(req, res, next) => {
     
     const { prompt } = req.body;
     console.log("question:", prompt);
    const data = {"question":prompt,"max_response_time":10}

    const options = {
        method: 'POST',
        url: 'https://you-chat-gpt.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '4311cea42bmshc97489894266b05p102e3bjsn6f8224244be9',
          'X-RapidAPI-Host': 'you-chat-gpt.p.rapidapi.com'
        },
        data: data
      };
      
    //   axios.request(options).then(function (response) {
    //       console.log(response.data);
    //   }).catch(function (error) {
    //       console.error(error);
    //   });

      try {
        
        const res1 = await axios.request(options);
        console.log("answer:",res1.data.answer)
        res.send(res1.data.answer);
      }
      catch (err) {
        next(err)
    }
})





app.listen(5000, () => {
    console.log('AI server started on http://localhost:5000');
})





// POST, SET, GET, DELETE