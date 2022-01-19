import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.valButtton }
            value={ nameSearch }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            onClick={ this.searchButton }
            disabled={ disableButton }
          >
            Pesquisar
          </button>
        </form>
        {loading && <span> Carregando... </span>}
        {albums.length > 0 && (
          <div>
            <h2>
              Resultado de álbuns de:
              { ' ' }
              { name }
            </h2>
            {albums.map((album) => (
              <div key={ album.collectionId }>
                <Link
                  to={ `album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <h5>{ album.collectionName }</h5>
                  <span>{ album.artistName }</span>
                </Link>
              </div>
            ))}
          </div>
        )}
        {resultEmpty === true && <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

export default Search;
