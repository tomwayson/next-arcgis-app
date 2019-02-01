// NOTE: these are needed to search items in server-side rendering
// they should be excluded from the client-side bundle via package.browser
// see: https://arunoda.me/blog/ssr-and-server-only-modules
import 'isomorphic-fetch';
import 'isomorphic-form-data';

import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../app.css';
import { initSession, signIn, signOut } from '../utils/session';
import AppNav from '../components/AppNav';
import UserMenu from '../components/UserMenu';

export default class NextArcGISApp extends App {
  // NOTE: this function is invoked on every request/transition
  // for the first request it will run on the server
  // for subsequent route transitions it will run on the client
  static async getInitialProps({ Component, /* router,  */ ctx }) {
    // get current or previous session (if any)
    const session = initSession(ctx);
    let pageProps = {};
    if (Component.getInitialProps) {
      // pass session to page so it can use it when fetching data, etc
      pageProps = await Component.getInitialProps(ctx, session);
    }
    // set the page title
    // TODO: should we read this from a config?
    pageProps.title = 'Next ArcGIS App';
    // build and return props for the app component
    const appProps = {
      pageProps
    };
    if (session) {
      // fetch user to pass along to the app
      // NOTE: pages do not (currently) need access to the user,
      // so we don't pass it as part of the page props
      appProps.user = await session.getUser();
    }
    return appProps;
  }
  signIn = () => {
    // sign in and then re-render the current route
    signIn().then(() => {
      Router.replace(Router.asPath);
    });
  };
  signOut = () => {
    // clear session and re-render the current route
    signOut();
    Router.replace(Router.asPath);
  };
  render() {
    // get the user and component/props for the current page
    const { Component, pageProps, user } = this.props;
    const title = pageProps.title;
    // render the page w/in the next.js container and app layout
    // NOTE: we bind the user menu and render it here
    // and pass it to the nav menu in order to avoid prop drilling
    // see: https://reactjs.org/docs/context.html#before-you-use-context
    const userMenu = (
      <UserMenu
        currentUser={user}
        onSignIn={this.signIn}
        onSignOut={this.signOut}
      />
    );
    return (
      <Container>
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="./static/favicon.ico" />
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <AppNav title={title} userMenu={userMenu} />
        <div className="container mt-5">
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}
