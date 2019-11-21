/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Form, SubmitButton, DeleteButton, List } from './styles';

export default class Main extends Component {
  // criando um state
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // criando a função que ao digitar dentro do input ele salva o valor dentro do stado 'newRepo'
  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    // atribuindo o valor do state a variavel newRepo
    const { newRepo, repositories } = this.state;
    // rota para obter os repositórios do github
    const response = await api.get(`/repos/${newRepo}`);

    // capturando apenas o nome do projeto
    const data = {
      name: response.data.full_name,
    };

    this.setState({
      // criando um novo vetor baseado no vetor já existente: imutabilidade
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  handleDelete = repo => {
    const { repositories } = this.state;
    this.setState({
      // está retornando os reposotórios onde o t for diferente do repositório que esta sendo recebido como parametro
      repositories: repositories.filter(t => t !== repo),
    });
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
              <DeleteButton
                key={repository}
                onClick={() => this.handleDelete(repository)}
                type="button"
              >
                <FaTrash color="#fff" size={14} />
              </DeleteButton>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
