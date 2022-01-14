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
  }

  handleClick = () => {
    const { nameInput } = this.state;
    this.setState({ loading: true });
    createUser({ name: nameInput }).then(() => {
      this.setState({ loading: false, redirect: true });
    });
  }

  handleInput = ({ target: { value } }) => {
    const MIN_LENGTH = 3;
    const validInput = value.length;
    if (validInput >= MIN_LENGTH) {
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
                data-testid="login-name-input"
                value={ nameInput }
                onChange={ this.handleInput }
              />
              <button
                data-testid="login-submit-button"
                type="submit"
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
