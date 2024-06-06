import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Table, Button} from 'reactstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { fetchRankingData } from '../../api';
import './design.css'


function Ranking() {
    
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    getRankingData();
    const interval = (setInterval(getRankingData, 3000));
    return () => clearInterval(interval);
  }, []);

  const getRankingData = async () => {
    const getRanking = await fetchRankingData();
    setRanking(getRanking);
  };

  

  return (
    <>
            <h1 style={{ textAlign: 'center', marginTop: '25px' }}>Ranking do Genious Simon SENAI</h1>
            <br />
            <Table dark>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((usuario, index) => (
                        <tr key={index}>
                            <td>
                              {index === 0 && <FontAwesomeIcon icon={faTrophy} style={{ color: 'yellow', paddingRight:'10px' }} />}
                              {index === 1 && <FontAwesomeIcon icon={faTrophy} style={{ color: 'ilver', paddingRight:'10px' }} />}
                              {index === 2 && <FontAwesomeIcon icon={faTrophy} style={{ color: 'brown', paddingRight:'10px' }} />}
                              {index + 1}
                              </td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.pontuacao}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button a href='/'>
              Voltar
            </Button>
        </>
    );
};
  
  export default Ranking;