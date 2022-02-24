import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

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
    };
  }

  // componentDidMount() {
  //   $('.owl-carousel').owlCarousel();
  // }

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
    const { disableButton, name, loading, albums, nameSearch, resultEmpty } = this.state;
    return (
      <div className="page-search">
        <div className="conteinerMenu">
          <Header />
          <form className="formSearch">
            <input
              className="form-control"
              type="text"
              data-testid="search-artist-input"
              onChange={ this.valButtton }
              value={ nameSearch }
              placeholder="Digite aqui sua busca"
            />
            <button
              className="btn btn-success"
              type="submit"
              data-testid="search-artist-button"
              onClick={ this.searchButton }
              disabled={ disableButton }
            >
              Pesquisar
            </button>
          </form>
        </div>
        {loading && <span> Carregando... </span>}
        {albums.length > 0 && (
          <div className="resultsSongs">
            <h2 className="display-5">
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
