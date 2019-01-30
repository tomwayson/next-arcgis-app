import React from 'react';
import Router from 'next/router';
import { searchItems } from '@esri/arcgis-rest-items';
import ItemsLayout from '../components/ItemsLayout';

class Items extends React.Component {
  // this is called on the server for initial render
  // or on the client when the route params change
  // see: https://nextjs.org/docs#fetching-data-and-component-lifecycle
  static async getInitialProps({ pathname, query }) {
    const defaults = {
      num: 10,
      start: 1
    };
    const searchForm = { ...defaults, ...query };
    // execute search and update state
    return searchItems({
      searchForm //,
      // TODO: pass session too
      // authentication
    })
      .then(({ results, total }) => {
        return {
          pathname,
          error: null,
          results,
          total,
          ...searchForm
        };
      })
      .catch(e => {
        this.setState({
          pathname,
          error: e.message || e,
          results: null,
          total: 0,
          ...searchForm
        });
      });
  }
  onParamsChange = (q, start) => {
    // update the route query params after the user either
    // submits the inline search form or links to a new page
    const { pathname } = this.props;
    const query = { q };
    if (start) {
      query.start = start;
    }
    Router.push({
      pathname,
      query
    });
  };
  render() {
    // these props are returned from getInitialProps
    const { results, total, num, q, start } = this.props;
    return (
      <ItemsLayout
        results={results}
        total={total}
        num={num}
        q={q}
        start={start}
        onParamsChange={this.onParamsChange}
      />
    );
  }
}

export default Items;
