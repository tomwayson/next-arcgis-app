import React from 'react';
import { withRouter } from 'next/router';

const ActiveLink = ({ children, router, href, className = '' }) => {
  const linkClass = `${className} ${router.pathname === href ? 'active' : ''}`;
  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <a href={href} onClick={handleClick} className={linkClass}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);
