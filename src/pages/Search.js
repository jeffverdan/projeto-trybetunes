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
    };
  }

  valButtton = ({ target: { value } }) => {
    const MINSTRING = 2;
    console.log(value.length);
    const valbutton = value.length <= MINSTRING;
    this.setState({
      nameSearch: value,
      disableButton: valbutton,
    });
    return value;
  }

  searchButton = (event) => {
    event.preventDefault();
    const { nameSearch } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(nameSearch);
      console.log(albums.length);
      const length = albums.length > 0
        ? this.setState({ resultEmpty: false })
        : this.setState({ resultEmpty: true });
      this.setState({
        albums,
        loading: false,
      });
      return length;
    });
  };

  render() {
    const { disableButton, loading, albums, nameSearch, resultEmpty } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.valButtton }
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
            <span>
              Resultado de álbuns de:
              { nameSearch }
            </span>
            {albums.map((result) => (
              <div key={ result.collectionID }>
                <Link
                  to={ `result/${result.collectionID}` }
                  data-testid={ `link-to-album-${result.collectionName}` }
                >
                  <img src={ result.artworkUrl100 } alt={ result.collectionName } />
                  <span>{ result.collectionName }</span>
                  <span>{ result.artistName }</span>
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
