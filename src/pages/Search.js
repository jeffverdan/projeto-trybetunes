import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disableButton: true,
      loading: true,
      albums: [],
      nameSearch: '',
      resultEmpty: true,
    };
  }

  valButtton = (event) => {
    const value = event.target.length <= 2
      ? this.setState({ disableButton: true })
      : this.setState({ disableButton: false });
    this.setState({ nameSearch: event.target.value });
    return value;
  }

  searchButton = () => {
    this.setState({ loading: true }, async () => {
      const { nameSearch } = this.state;
      const albums = await searchAlbumsAPI(nameSearch);
      const length = albums.length !== 0
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
        {loading ? <span> Carregando... </span>
          : (
            <section>
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.valButtton }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                onChange={ this.searchButton }
                disabled={ disableButton }
              >
                Pesquisar
              </button>
            </section>
          )}
        {albums.length !== 0 && (
          <div>
            <span>
              Resultado de álbuns de:
              {`${nameSearch}`}
            </span>
          </div>
        )}
        {resultEmpty === true && <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

export default Search;
