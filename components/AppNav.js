import React from 'react';
import ActiveLink from './ActiveLink';
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
    const { title, userMenu } = this.props;
    return (
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href="#">{title}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <ActiveLink className="nav-link" href="/">
                Home
              </ActiveLink>
            </NavItem>
            <NavItem>
              <ActiveLink className="nav-link" href="/items">
                Items
              </ActiveLink>
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
