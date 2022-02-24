import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../pages/Search.css';

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
      <header className="header">
        {loading ? <span> Carregando... </span>
          : <span className="display-4">{dataUser.name}</span>}
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
      </header>
    );
  }
}

export default Header;
