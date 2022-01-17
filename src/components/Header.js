import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      dataUser: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.dataName();
  }

  dataName = async () => {
    this.setState({ loading: true });
    const getNameUser = await getUser();
    this.setState({ dataUser: getNameUser, loading: false });
  }

  render() {
    const { dataUser, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <span> Carregando... </span>
          : <span data-testid="header-user-name">{dataUser.name}</span>}
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
