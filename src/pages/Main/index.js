/* eslint-disable no-throw-literal */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Form, SubmitButton, DeleteButton, List, InputForm } from './styles';

export default class Main extends Component {
  // criando um state
  state = {
    newRepo: '',
    hasErro: false,
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
    try {
      const { newRepo, repositories } = this.state;

      // verificando se o input está vazio
      if (newRepo === '') throw 'Você precisa inserir o nome de um repositório';

      // verificando se o repositório não está duplicado
      const hasRepository = repositories.find(
        repository => repository.name === newRepo
      );

      if (hasRepository) throw 'O repositório já existe';

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
        hasErro: false,
      });
    } catch (error) {
      this.setState({ loading: false, hasErro: true });
    }
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
    const { newRepo, repositories, loading, hasErro } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} hasErro={hasErro}>
          <InputForm value={newRepo} onChange={this.handleInputChange} />
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
