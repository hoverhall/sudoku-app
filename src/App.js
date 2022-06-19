import './App.css'
import BoardView from './components/BoardView'
import corpLogo from './assets/images/corp-logo.png'

function App() {
  

  return (
    <div className="App">
      <section className='corporate-logo'>
        <div className='img-logo' style={{backgroundImage: `url(${corpLogo})`}}></div>
        <h1 className='text-logo'>Sudoku</h1>
      </section>
      <BoardView />
    </div>
  );
}

export default App;