import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const lsRepositories = localStorage.getItem('repositories');

    if (lsRepositories) {
      setRepositories(JSON.parse(lsRepositories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const find = repositories.find(repository => repository.name === newRepo);
      if (find) {
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };

      setRepositories([...repositories, data]);
      setNewRepo('');
    } catch (catchError) {
      setErrorMessage(catchError.message);
      setError(true);
    }

    setLoading(false);
  };
  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={error}>
        <input
          type="text"
          placeholder="Adicionar Repositório"
          onChange={e => handleInputChange(e)}
          value={newRepo}
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>
      <p>{errorMessage}</p>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
