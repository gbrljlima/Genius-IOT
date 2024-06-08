// src/api.js

//Pegar a classificação no banco
export const fetchRankingData = async () => {
  const response = await fetch('/ranking');
  return response.json();
};

//Enviar o nome para o MQTT
export const registrarNome = async (nome) => {
  await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nome),
  })
}

