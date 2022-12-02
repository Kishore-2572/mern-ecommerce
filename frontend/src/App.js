import './App.css';

import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/homescreen.js';
import ProductScreen from './screens/productscreen/productscreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <Link to="/">Amazona</Link>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/product/:slug' element={<ProductScreen/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
