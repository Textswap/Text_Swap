/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  NavDropdown,
} from 'react-bootstrap';
import {
  BoxArrowRight,
  List,
  Lock,
  PersonFill,
  PersonPlusFill,
} from 'react-bootstrap-icons';
import { BookCheck } from 'lucide-react';
import { useState } from 'react';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" expand="lg" className="mb-0">
      <Container>
        <Navbar.Brand className="me-auto" href="/">
          TextSwap
          <BookCheck />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-label="Toggle navigation"
          onClick={handleShow}
          style={{ border: 'none', padding: 0 }}
        >
          <List color="white" size={24} />
        </Navbar.Toggle>
{' '}
        <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
          <Nav>
            {currentUser && role === 'ADMIN' && (
              <Nav.Link
                id="admin-stuff-nav"
                href="/admin"
                key="admin"
                active={pathName === '/admin'}
              >
                Admin
              </Nav.Link>
            )}
            {currentUser && (
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
                <NavDropdown title={currentUser} id="email-dropdown">
                  <NavDropdown.Item
                    id="login-dropdown-sign-out"
                    href="/api/auth/signout"
                  >
                    <BoxArrowRight />
{' '}
Sign Out
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    id="login-dropdown-change-password"
                    href="/auth/change-password"
                  >
                    <Lock />
{' '}
Change Password
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {!session && (
              <>
                <Nav.Link
                  id="login-dropdown-sign-in"
                  href="/auth/signin"
                  active={false}
                >
                  <PersonFill />
{' '}
Sign in
                </Nav.Link>
                <Nav.Link
                  id="login-dropdown-sign-up"
                  href="/auth/signup"
                  active={false}
                >
                  <PersonPlusFill />
{' '}
Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="d-lg-none"
          style={{ backgroundColor: 'rgba(200, 230, 201, 0.9)' }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {currentUser && role === 'ADMIN' && (
                <Nav.Link
                  id="admin-stuff-nav"
                  href="/admin"
                  key="admin"
                  active={pathName === '/admin'}
                >
                  Admin
                </Nav.Link>
              )}
              {currentUser && (
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
                  <NavDropdown title={currentUser} id="email-dropdown">
                    <NavDropdown.Item
                      id="login-dropdown-sign-out"
                      href="/api/auth/signout"
                    >
                      <BoxArrowRight />
{' '}
Sign Out
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      id="login-dropdown-change-password"
                      href="/auth/change-password"
                    >
                      <Lock />
{' '}
Change Password
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {!session && (
                <>
                  <Nav.Link
                    id="login-dropdown-sign-in"
                    href="/auth/signin"
                    active={false}
                  >
                    <PersonFill />
{' '}
Sign in
                  </Nav.Link>
                  <Nav.Link
                    id="login-dropdown-sign-up"
                    href="/auth/signup"
                    active={false}
                  >
                    <PersonPlusFill />
{' '}
Sign up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
