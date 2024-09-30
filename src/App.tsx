import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      {/* Nav is rendered once here */}
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
