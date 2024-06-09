(async()=>{

        const express = require('express');
        const app = express();
        const db = require('./db');
        const client = require('./mqtt');
        const port = 3001;

        let tempoInicio;
        let tempoFim;

        app.use(express.json());
        //Coleta as informações dos jogadores no banco de dados
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
        //Envio do nick do jogador para o MQTT
        app.post('/', async (req, res) => {
            const { nickname } = req.body;
            const topic = 'Uesleianonimus/nome';
            try {
                tempoInicio = new Date();
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
        //Conexão no MQTT
        const topic = 'Uesleianonimus/genius';
        client.on('connect', () => {
            console.log('Connected');
            client.subscribe([topic], () => {
                console.log(`Subscribe to topic '${topic}'`);
            });
        
        });
        //Envio das informações da partida para o banco de dados
        client.on('message', async (topic, payload) => {
            console.log('Received Message:', topic, payload.toString());
            const split = payload.toString().split(",");
            const nome = split[0];
            const pontuacao = parseInt(split[1]);
            try {
                tempoFim = new Date();
                //Duração da partida
                const duracao = ((tempoFim - tempoInicio) / 1000) - 3; // Delay entre a entrada do nome e o inicio do jogo
                await db.query('INSERT INTO classificacao (nome, pontuacao, duracao) VALUES (?, ?, ?)', [nome, pontuacao, duracao]);
            }
            catch (error) {
                console.error(error);
            }
        });

        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
    }
)();