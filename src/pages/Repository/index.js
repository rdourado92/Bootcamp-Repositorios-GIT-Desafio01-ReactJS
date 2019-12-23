import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import {
  Loading,
  Owner,
  IssueList,
  IssueSpan,
  Issues,
  LoadingIssues,
} from './styles';

function Repository({ match }) {
  const repoName = decodeURIComponent(match.params.repository);

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [status, setStatus] = useState('open');
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  async function loadIssues(
    state = status,
    per_page = perPage,
    thisPage = page
  ) {
    setStatus(state);
    setPerPage(per_page);
    setPage(thisPage);
    setLoadingIssues(true);

    const responseIssues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        per_page,
        page: thisPage,
      },
    });

    setIssues(responseIssues.data);
    setLoadingIssues(false);
  }

  async function loadData() {
    const [responseRepository] = await Promise.all([
      api.get(`/repos/${repoName}`),
      loadIssues(),
    ]);

    setRepository(responseRepository.data);
    setLoading(false);
  }

  function changePage(newPage) {
    if (newPage === 0) {
      return;
    }

    loadIssues(status, perPage, newPage);
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading>Carregando...</Loading>;
  }
  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>

      <Issues>
        <div>
          <select value={status} onChange={e => loadIssues(e.target.value)}>
            <option value="all">Todas</option>
            <option value="open">Abertas</option>
            <option value="closed">Fechadas</option>
          </select>

          <span>
            <select
              value={perPage}
              onChange={e => loadIssues(status, e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            por página
          </span>
        </div>
        <IssueList>
          {loadingIssues ? (
            <LoadingIssues>Carregando...</LoadingIssues>
          ) : (
            issues &&
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {issue.title}
                    </a>
                    {issue.labels.map(label => (
                      <IssueSpan color={label.color} key={String(label.id)}>
                        {label.name}
                      </IssueSpan>
                      // <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          )}
        </IssueList>

        <div>
          <button
            type="button"
            disabled={page === 1 ? 'disabled' : ''}
            onClick={e => changePage(page - 1)}
          >
            Anterior
          </button>

          <button type="button" onClick={e => changePage(page + 1)}>
            Próxima
          </button>
        </div>
      </Issues>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
