import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Header from '../components/Header';
// import Pagination from '../components/Pagination';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

const WINDOW_SIZE = 700;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disableButton: true,
      albums: [],
      nameSearch: '',
      resultEmpty: false,
      loading: false,
      name: '',
      windowDesktop: false,
    };
  }

  componentDidMount() {
    this.onMount();
  }

  onMount() {
    if ($(window).width() > WINDOW_SIZE) this.setState({ windowDesktop: true });
    console.log($(window));
  }

  valButtton = ({ target: { value } }) => {
    const MINSTRING = 2;
    const valbutton = value.length < MINSTRING;
    this.setState({
      nameSearch: value,
      disableButton: valbutton,
    });
  }

  searchButton = (event) => {
    event.preventDefault();
    const { nameSearch } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(nameSearch);
      const length = albums.length > 0
        ? this.setState({ resultEmpty: false })
        : this.setState({ resultEmpty: true });
      this.setState({
        name: nameSearch,
        nameSearch: '',
        albums,
        loading: false,
      });
      return length;
    });
  };

  render() {
    const {
      disableButton, name, loading, albums, nameSearch, resultEmpty, windowDesktop,
    } = this.state;
    return (
      <div className="page">
        <Navbar bg="dark" expand={ windowDesktop } variant="dark">
          <Container>
            <Navbar.Brand>Bem vindo!</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto fixed"
                navbarScroll
              >
                <Header />
                <form className="formSearch">
                  <input
                    className="form-control inputSearch"
                    type="text"
                    onChange={ this.valButtton }
                    value={ nameSearch }
                    placeholder="Digite aqui sua busca"
                  />
                  <button
                    className="btn btn-success"
                    type="submit"
                    onClick={ this.searchButton }
                    disabled={ disableButton }
                  >
                    Pesquisar
                  </button>
                </form>
                {albums.length > 0 && (
                  <div className="header">
                    <span className="fs-6">
                      Albuns Encontrados:&nbsp;
                      {albums.length}
                    </span>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {loading && <span> Carregando... </span>}
        {albums.length > 0 && (
          <div className="results">
            <h2 className="display-6">
              {`Resultado da pesquisa para: " ${name} "`}
            </h2>
            <div className="">
              <div className="row">
                {albums.map((album) => (
                  <div className="card" key={ album.collectionId }>
                    <Link
                      to={ `album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img
                        className="card-img"
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                      />
                      <h5 className="card-title">{album.collectionName}</h5>
                      <p className="card-text">{album.artistName}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {resultEmpty === true && <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

export default Search;
