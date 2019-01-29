import React from 'react'
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

class AppNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { userMenu } = this.props;
    // TODO: show active link based on the current route
    // see: https://github.com/zeit/next.js/#using-a-higher-order-component
    return (
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href="#">Ambitious ArcGIS App</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/items">
                <a className="nav-link">Items</a>
              </Link>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            {userMenu}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default AppNav;
