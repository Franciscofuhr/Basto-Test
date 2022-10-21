import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <ChakraProvider>

      <Routes>
        <Route exact path='/' element={<Landing />} />

      </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
