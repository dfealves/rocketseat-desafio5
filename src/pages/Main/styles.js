import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.hasErro ? 'red' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }

`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  justify-items: center;

  &&[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    //  se loading = true será executada a animação do icon
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /* & + li, estou capturando todos os li's e pegando qualquer li que seja seguido por um li anterior
    verifica se existe um li antes dele, se não existir não aplica o estilo ao primeiro, somente aos que são seguidos por outros li ex:

    li = neste não
    li = sim
    li = sim
    li = sim
    li = sim
    li = sim

     */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;

export const DeleteButton = styled.button`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  justify-items: center;
  height: 40px;
`;

export const InputForm = styled.input.attrs(props => ({
  type: 'text',
  placeholder: 'Adicionar repositório',
  hasErro: props.hasErro,
}))`
  flex: 1;
  border: 1px solid #eee;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;

  /* ${props =>
    props.hasErro &&
    css`
      border-color: red !important;
    `} */
`;
