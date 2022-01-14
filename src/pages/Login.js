import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      disabledButton: true,
      loading: false,
      redirect: false,
    };
    this.validName = this.validName.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClick = () => {
    const { nameInput } = this.state;
    this.setState({ loading: true });
    createUser({ name: nameInput }).then(() => {
      this.setState({ loading: false, redirect: true });
    });
  }

  handleInput = ({ target }) => {
    const { name } = target;
    const { value } = target;
    console.log(value);
    this.setState({
      [name]: value,
    }, () => this.validName());
  }

  validName() {
    const MIN_LENGTH = 3;
    const { nameInput } = this.state;
    if (nameInput.length >= MIN_LENGTH) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  render() {
    const { nameInput, disabledButton, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {redirect && <Redirect to="/search" />}
        {loading ? <p>Carregando...</p> : (
          <>
            <img src="" alt="logoTrybe" />
            <form>
              <input
                type="text"
                name="nameInput"
                data-testid="login-name-input"
                value={ nameInput }
                onChange={ this.handleInput }
              />
              <button
                data-testid="login-submit-button"
                type="submit"
                name=""
                disabled={ disabledButton }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default Login;
