// src/api.js

export const fetchRankingData = async () => {
  const response = await fetch('/ranking');
  return response.json();
};

export const registrarNome = async (nome) => {
  await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nome),
  })
}

