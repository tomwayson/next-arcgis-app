import React from 'react';
import Router from 'next/router';
import AgoSearch from '../components/AgoSearch';

function index() {
  function onSearch(q) {
    // pass the search term to the items page
    Router.push({
      pathname: '/items',
      query: { q }
    });
  }
  return (
    <div className="jumbotron">
      <h1 className="display-3 text-light text-center mb-5">
        Ambitious ArcGIS App
      </h1>
      <AgoSearch q="" onSearch={onSearch} size="lg" />
    </div>
  );
}

export default index;
