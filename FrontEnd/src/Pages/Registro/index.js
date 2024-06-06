import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Form, Label, Input, FormGroup, Button} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';    
import { registrarNome } from '../../api';

function Registro() {
    const[nickname, setNickname] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      await registrarNome({ nickname });
      setNickname('');
    };
  
    return (
        <div className="App">
      <h1>Informe o seu nickname para iniciar!</h1>
      <Form className="form-centered col-md-7" onSubmit={handleSubmit}>
        <FormGroup>
          <Label
          for="exampleName"
          hidden
        >
          Nome
        </Label>
        <Input style={{ marginTop: '60px'}}
          id="exampleName"
          placeholder="nickname"
          value={nickname}
          type="text"
          onChange={(e) => setNickname(e.target.value)} 
        />
      </FormGroup>
      <Button type='submit'>
        Enviar
      </Button>
      <Button a href='/ranking'>
        Classificação
      </Button>
    </Form>
    </div>
    );           
  };
  
  export default Registro;