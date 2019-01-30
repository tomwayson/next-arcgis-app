import { UserSession } from '@esri/arcgis-rest-auth';
import getConfig from 'next/config';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const { publicRuntimeConfig: env } = getConfig();
const isServer = typeof window === 'undefined';
const SESSION_COOKIE_NAME = `${env.cookiePrefix}_session`;
const SESSION_GLOBAL_NAME = `__${SESSION_COOKIE_NAME.toUpperCase()}__`;

export function initSession(ctx) {
  // first, see if the session has already been initialized
  let session = getSession();
  if (session) {
    return session;
  }
  // either this is running on the server,
  // or this is the first route transition on the client
  // try to read the previous session from a cookie
  session = restoreSession(ctx);
  // save the session for subsequent requests
  // so that we are not dependent on cookies
  setSession(session);
  return session;
}

/**
 * sign in using OAuth pop up
 */
export function signIn() {
  const { clientId, portal } = env;
  return UserSession.beginOAuth2({
    clientId,
    portal,
    popup: true,
    redirectUri: `${window.location.origin}/static/redirect.html`
  }).then(session => {
    // hold onto the session in the browser for the duration of the user's current visit
    setSession(session);
    // persist the session for future visits
    saveSession(session);
    return session;
  });
}

/**
 * make sure the user is not logged in the next time they load the app
 */
export function signOut() {
  setSession(null);
  deleteSession();
}

// hold onto the session in the browser for the duration of the user's current visit
// NOTE: currently implemented w/ a global variable, but could use session storage, etc instead
function getSession() {
  return !isServer && window[SESSION_GLOBAL_NAME];
}

function setSession(session) {
  if (isServer) {
    return;
  }
  window[SESSION_GLOBAL_NAME] = session;
}

/**
 * restore a previously saved session
 */
function restoreSession(ctx) {
  const cookies = parseCookies(ctx);
  const serializedSession = cookies[SESSION_COOKIE_NAME];
  const session =
    serializedSession && UserSession.deserialize(serializedSession);
  return session;
}

// save session & user for next time the user loads the app
function saveSession(session, ctx) {
  // get expiration from session
  const expires = session.tokenExpires;
  setCookie(ctx, SESSION_COOKIE_NAME, session.serialize(), { expires });
}

// delete a previously saved session
function deleteSession(ctx) {
  destroyCookie(ctx, SESSION_COOKIE_NAME);
}
