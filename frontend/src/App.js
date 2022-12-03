import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/homescreen.js';
import ProductScreen from './screens/productscreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/esm/Nav';
import { useContext } from 'react';
import { Store } from './Store';

function App() {
  const {state} =useContext(Store);
  const {cart}=state;
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column site-container">
        <header className="header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  cart
                  {cart.cartItems.length>0 && (
                    <Badge pill bg="danger">{cart.cartItems.reduce((a,c)=>  a+c.quantity,0)}</Badge>
                  )

                  }
                </Link>
              </Nav>
            </Container>
          </Navbar>
          {/* <Link to="/">Amazona</Link> */}
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>
            All rights reserved
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
