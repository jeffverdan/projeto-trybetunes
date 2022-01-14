import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutePages from './RoutePages';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <RoutePages />
      </BrowserRouter>
    );
  }
}

export default App;
