// NOTE: these are needed to search items in server-side rendering
// they should be excluded from the client-side bundle via package.browser
// see: https://arunoda.me/blog/ssr-and-server-only-modules
import 'isomorphic-fetch';
import 'isomorphic-form-data';

import React from 'react';
import App, { Container } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import '../app.css';
import AppNav from '../components/AppNav';

function AppLayout({ children }) {
  // TODO: build user menu from session
  const userMenu = null;
  return (
    <>
      <AppNav userMenu={userMenu} />
      <div className="container mt-5">{children}</div>
    </>
  );
}

export default class NextArcGISApp extends App {
  render() {
    // get the component and props for the current page
    const { Component, pageProps } = this.props;
    // render the page w/in the next.js container and app layout
    return (
      <Container>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Container>
    );
  }
}
