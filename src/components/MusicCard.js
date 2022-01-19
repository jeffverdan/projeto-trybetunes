import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    const { trackId } = this.props;
    getFavoriteSongs().then((result) => {
      result.forEach((element) => {
        if (element.trackId === trackId) {
          this.setState({
            favorite: true,
          });
        }
      });
    });
  }

  handleClick = ({ target: { checked } }) => {
    const { track } = this.props;
    this.setState({ loading: true });
    if (checked) {
      addSong(track).then(() => {
        this.setState({ loading: false, favorite: true });
      });
    } else {
      removeSong(track).then(() => {
        this.setState({ loading: false, favorite: false });
      });
    }
  }

  render() {
    const { musicName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <>
        <div>
          <h2>{ musicName }</h2>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleClick }
              checked={ favorite }
            />
          </label>
        </div>
        {loading && <span>Carregando...</span>}
      </>
    );
  }
}

MusicCard.propTypes = {
  musicName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  track: propTypes.objectOf(propTypes.any).isRequired,
};

export default MusicCard;
