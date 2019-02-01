import React from 'react';
import Router from 'next/router';
import AgoSearch from '../components/AgoSearch';

class Index extends React.Component {
  onSearch = q => {
    // pass the search term to the items page
    Router.push({
      pathname: '/items',
      query: { q }
    });
  };
  render() {
    const { title } = this.props;
    return (
      <div className="jumbotron">
        <h1 className="display-3 text-light text-center mb-5">{title}</h1>
        <AgoSearch q="" onSearch={this.onSearch} size="lg" />
      </div>
    );
  }
}

export default Index;
