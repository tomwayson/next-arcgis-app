import React from 'react';
import Router from 'next/router';
import { Alert } from 'reactstrap';
import { searchItems } from '@esri/arcgis-rest-portal';
import ItemsLayout from '../components/ItemsLayout';

class Items extends React.Component {
  // this is called on the server for initial render
  // or on the client when the route params change
  // see: https://nextjs.org/docs#fetching-data-and-component-lifecycle
  // NOTE: for an example of how to show a loading transition:
  // see: https://github.com/zeit/next.js/tree/canary/examples/with-loading
  static async getInitialProps({ pathname, query }, authentication) {
    const defaults = {
      num: 10,
      start: 1,
      authentication: authentication
    };
    const searchForm = { ...defaults, ...query };
    if (!searchForm.q) {
      // invalid search term, emulate an empty response rather than sending a request
      return {
        pathname,
        error: null,
        results: [],
        total: 0,
        ...searchForm
      };
    }
    // execute search and update state
    return searchItems(searchForm)
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
        // TODO: should we not catch here and instead
        // let users be taken to the error route?
        // see: https://nextjs.org/docs#custom-error-handling
        return {
          pathname,
          error: e.message || e,
          results: null,
          total: 0,
          ...searchForm
        };
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
    const { error, results, total, num, q, start } = this.props;
    if (error) {
      return <Alert color="danger">{error}</Alert>;
    }
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
