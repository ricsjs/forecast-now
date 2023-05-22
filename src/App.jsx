import './app.css';
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Main from './components/main';

function App() {

  return (
    <div>
      <Header />
      <main className='main'>
        <Main />
      </main>
      <Footer />
    </div>
  );
}

export default App;
