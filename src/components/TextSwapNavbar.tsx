/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BoxArrowRight,
  Lock,
  PersonFill,
  PersonPlusFill,
} from 'react-bootstrap-icons';
import { BookCheck } from 'lucide-react';
import SearchBar from './SearchBar';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  // Define paths where the search bar should not appear
  const hideSearchBarPaths = ['/auth/signin', '/auth/signup', '/'];
  const shouldHideSearchBar = hideSearchBarPaths.includes(pathName);

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand className="me-auto" href="/">
          TextSwap
          <BookCheck />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link
                id="admin-stuff-nav"
                href="/admin"
                key="admin"
                active={pathName === '/admin'}
              >
                Admin
              </Nav.Link>
            ) : null}
          </Nav>
          {!shouldHideSearchBar && (
            <Nav className="nav-search-bar d-none d-lg-flex">
              <SearchBar />
            </Nav>
          )}
          <Nav className="ms-auto">
            {currentUser ? (
              <>
                <Nav.Link
                  id="buy-books-nav"
                  href="/buy"
                  key="buy"
                  active={pathName === '/buy'}
                >
                  Buy
                </Nav.Link>
                <Nav.Link
                  id="sell-books-nav"
                  href="/sell"
                  key="sell"
                  active={pathName === '/sell'}
                >
                  Sell
                </Nav.Link>
                <Nav.Link
                  id="cart-nav"
                  href="/cart"
                  key="cart"
                  active={pathName === '/cart'}
                >
                  Cart
                </Nav.Link>
                <Nav.Link
                  id="account-nav"
                  href="/account"
                  key="account"
                  active={pathName === '/account'}
                >
                  Account
                </Nav.Link>
              </>
            ) : null}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item
                  id="login-dropdown-sign-out"
                  href="/api/auth/signout"
                >
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="login-dropdown-change-password"
                  href="/auth/change-password"
                >
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item
                  id="login-dropdown-sign-in"
                  href="/auth/signin"
                >
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="login-dropdown-sign-up"
                  href="/auth/signup"
                >
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          {!shouldHideSearchBar && (
            <Nav className="d-lg-none w-100">
              <NavDropdown id="search-dropdown" title="Search">
                <div className="collapse-search-bar">
                  <SearchBar />
                </div>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
