import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p> Album page </p>
      </div>
    );
  }
}

export default Album;
