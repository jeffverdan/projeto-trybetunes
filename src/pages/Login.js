import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import './Login.css';

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
    const { history } = this.props;
    return (
      <div className="page-login">
        {redirect && history.push('search') }
        {loading ? <p>Carregando...</p> : (
          <>
            <img id="logoTrybe" src="https://media2.giphy.com/media/e6w3i2arfjIoI8hWy0/giphy.gif?cid=790b7611e40800e87440296d5aac144447e43c1e0c48e6eb&rid=giphy.gif&ct=g" alt="logoTrybe" />
            <h3>TrybeTunes</h3>
            <form className="fromLogin">
              <input
                type="text"
                name="nameInput"
                className="nameInput"
                data-testid="login-name-input"
                placeholder="Digite seu login aqui"
                value={ nameInput }
                onChange={ this.handleInput }
                required
              />
              <button
                data-testid="login-submit-button"
                type="submit"
                className="loginButton"
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

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
