import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default class MainPage extends Component {
  state = {
    newRepo: 'facebook/react',
    repositorys: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositorys: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositorys } = this.state;
    if (prevState.repositorys !== repositorys) {
      localStorage.setItem('repositories', JSON.stringify(repositorys));
    }
  }

  handleInputChage = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repositorys } = this.state;

    this.setState({ loading: true });
    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositorys: [...repositorys, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, repositorys, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Ropositorios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChage}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositorys.map(repository => (
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
}
