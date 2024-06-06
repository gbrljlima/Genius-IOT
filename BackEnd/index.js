(async()=>{

        const express = require('express');
        const app = express();
        const db = require('./db');
        const client = require('./mqtt');
        const port = 3001;



        app.use(express.json());

        app.get('/ranking', async (req, res) => {
            try {
                const [ranking] = await db.query('SELECT * FROM classificacao order by pontuacao desc');
                res.json(ranking);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Erro ao buscar ranking');
            }
        })
        app.post('/', async (req, res) => {
            const { nickname } = req.body;
            const topic = 'Uesleianonimus/nome';
            try {
                client.publish(topic, `${nickname}`, { qos: 0, retain: false }, (error) => {
                    if (error) {
                    console.error(error)
                    }
                })
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Erro ao buscar nome');
            }
        })

        const topic = 'Uesleianonimus/genius';
        client.on('connect', () => {
            console.log('Connected');
            client.subscribe([topic], () => {
                console.log(`Subscribe to topic '${topic}'`);
            });
        
        });
        client.on('message', async (topic, payload) => {
            console.log('Received Message:', topic, payload.toString());
            const split = payload.toString().split(",");
            const nome = split[0];
            const pontuacao = parseInt(split[1]);
            
            try {
                await db.query('INSERT INTO classificacao (nome, pontuacao) VALUES (?, ?)', [nome, pontuacao]);
            }
            catch (error) {
                console.error(error);
            }
        });

        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
    }
)();