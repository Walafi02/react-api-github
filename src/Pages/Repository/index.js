import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssuesList, Footer } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {}, // objeto
    issues: [], // array
    loading: true,
    perPage: 5,
    page: 1,
    loadingIssue: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const { perPage } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: perPage,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleSelectIssue = async e => {
    const { repository } = this.state;

    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: `${e.target.value}`,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  handleButtonPaginate = async num => {
    const { perPage, page, repository } = this.state;
    this.setState({
      page: page + num,
      loadingIssue: true,
    });

    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: 'open',
        per_page: perPage,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      loadingIssue: false,
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      perPage,
      page,
      loadingIssue,
    } = this.state;

    if (loading) return <Loading>Carregando...</Loading>;

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos Repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesList>
          <div>
            Search Issue:
            <select onChange={this.handleSelectIssue}>
              <option value="all">all</option>
              <option value="open">open</option>
              <option value="closed">closed</option>
            </select>
          </div>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}

          <Footer>
            <button
              type="button"
              disabled={page === 1 || loadingIssue}
              onClick={() => this.handleButtonPaginate(-1)}
            >
              <IoIosArrowBack />
            </button>
            <span title="Paginação">{page}</span>
            <button
              type="button"
              disabled={issues.length < perPage || loadingIssue}
              onClick={() => this.handleButtonPaginate(1)}
            >
              <IoIosArrowForward />
            </button>
          </Footer>
        </IssuesList>
      </Container>
    );
  }
}
