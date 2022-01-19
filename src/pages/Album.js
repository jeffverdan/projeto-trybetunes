import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
      infoAlbum: {
        title: '',
        artist: '',
        cover: '',
      },
    };
  }

  componentDidMount() {
    this.getMusicAPI();
  }

  getMusicAPI = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const getMusicAPI = await getMusics(id).then((result) => result);
    const filterMusic = getMusicAPI.filter((music) => music.kind === 'song');
    const filterInfo = getMusicAPI.filter((info) => info.kind !== 'song');
    const { artworkUrl100, artistName, collectionName } = filterInfo[0];
    this.setState({
      album: [...filterMusic],
      infoAlbum: {
        title: collectionName,
        artist: artistName,
        cover: artworkUrl100,
      },
    });
  }

  render() {
    const { album, infoAlbum: { title, artist, cover } } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ cover } alt={ title } />
          <h2 data-testid="album-name">{ title }</h2>
          <span data-testid="artist-name">{ artist }</span>
        </div>
        <div>
          {album.map((songs) => (
            <MusicCard
              key={ songs.trackName }
              musicName={ songs.trackName }
              previewUrl={ songs.previewUrl }
              trackId={ songs.trackId }
              track={ songs }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
