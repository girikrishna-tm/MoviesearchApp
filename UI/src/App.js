import logo from './logo.svg';
import './App.css';
import SearchMovie from './SearchMovie';

function App() {
  return (
    <div className="container  movie-search-container">
      <h1 className="title">Movie Search</h1>
      <SearchMovie />
    </div>
  );
}

export default App;
