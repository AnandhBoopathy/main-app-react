import { BrowserRouter, Switch, Route } from 'react-router-dom'

// page components
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Recipe1 from './pages/recipe/Recipe1'


// styles
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/recipes">
            <Recipe1 />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App