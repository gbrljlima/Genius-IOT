import React, { useState } from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { registrarNome } from '../../api';

function Registration() {
  const [nickname, setNickname] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    const nicknameTratada = nickname.trim().replace(/\s+/g, ' ');
    setNickname(nickname.trim().replace(/\s+/g, ' '));
    if (nicknameTratada.length < 3) {
      alert("Mínimo de 3 caracteres para o nickname!");
      return;
    }
    toast.success("Jogador(a) cadastrado com sucesso!", {
      position: "top-right"
    });
    await registrarNome({ nickname: nicknameTratada });
    setNickname('');
  };

  return (
    
    <div className="App">
      <h1>Informe o seu nickname para iniciar!</h1>
      <Form className="form-centered col-md-7" onSubmit={handleRegistration}>
        <FormGroup>
          <Label for="exampleName" hidden>
            Nome
          </Label>
          <Input
            style={{ marginTop: '60px' }}
            id="exampleName"
            placeholder="nickname (min 3 caracteres)"
            value={nickname}
            type="text"
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">
          Enviar
        </Button>
        <Button href="/ranking" style={{ marginLeft: '20px' }}>
          Classificação
        </Button>
      </Form>
      <ToastContainer autoClose={3000} /> 
    </div>
    
  );
}

export default Registration;
