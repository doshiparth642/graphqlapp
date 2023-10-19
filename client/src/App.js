import './App.css';
import Navbar from './Components/Navbar';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

function App() {
  const element = useRoutes(routes)
  return (
    <div className='App'>
      <Navbar />
      {element}
    </div>
  );
}

export default App;
